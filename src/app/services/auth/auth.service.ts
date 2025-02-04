import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from '../http/http.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  isLoadingButton = false
  constructor(
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private storageService: StorageService,
    private httpService: HttpService,
    private message: NzMessageService
  ) {
    const token = this.storageService.getLocalStorage('auth-token')
    if (token) {
      this.loggedIn = true;
      const decodedToken = jwtHelperService.decodeToken(token);
      const expirationDate = jwtHelperService.getTokenExpirationDate(token);
      const isExpired = jwtHelperService.isTokenExpired(token);
      //console.log({ "decodedToken": decodedToken, "expirationDate": expirationDate, "isExpired": isExpired })
    }
  }

  login() {
    this.loggedIn = true;
    this.router.navigate(["feed"]);
  }

  async logout() {
    this.isLoadingButton = true
    const request = {
      method: 'POST',
      action_url: '/logout'  //Domin/api/login
    };
    this.httpService.doHttpJson(request)?.subscribe({
      next: (res: any) => {
        if (res.body.status) {
          this.isLoadingButton = false
          this.storageService.removeLocalStorage('auth-token')
          this.storageService.removeLocalStorage('userData')
          localStorage.clear();
          this.loggedIn = false;
          this.message.create('success', res.body.message);
          this.router.navigateByUrl('login');
        }
      },
      error: (err) => {
        this.isLoadingButton = false;
        this.message.create('error', err);
      },
    });
  }

  isLoggedIn() {
    const token = this.storageService.getLocalStorage('auth-token');
    return this.loggedIn && token && !this.jwtHelperService.isTokenExpired(token);
  }
}

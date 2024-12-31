import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private storageService: StorageService
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
    this.storageService.removeLocalStorage('auth-token')
    this.storageService.removeLocalStorage('userData')
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigateByUrl('login');
  }

  isLoggedIn() {
    const token = this.storageService.getLocalStorage('auth-token');
    return this.loggedIn && token && !this.jwtHelperService.isTokenExpired(token);
  }
}

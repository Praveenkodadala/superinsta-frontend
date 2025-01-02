import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup , FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { HttpService } from '../../services/http/http.service';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgZorroAntdModule
     ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoadingButton = false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private storageService: StorageService,
    private authService: AuthService,
    private message:NzMessageService
  ) { }

  ngOnInit(): void {
    this.loginFormFunc();
  }


  loginFormFunc() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember:[true]
    });
  }



  submitForm() {
    if (!this.loginForm.valid)  return
    this.isLoadingButton = true
    const formData = new FormData();
    formData.append('email', this.loginForm.value.email);
    formData.append('password', this.loginForm.value.password);
    const request = {
      params: formData,
      method: 'POST',
      action_url: '/login', //Domin/api/login
    };
    this.httpService.doHttpFormData(request)?.subscribe({
      next: (res: any) => {
        if (res.body.status) {
          this.isLoadingButton = false
          this.storageService.setLocalStorage('userData', JSON.stringify(res.body.data));
         // this.httpService.userData = res.body.data;
          this.authService.login()
        }
     
      },
      error: (err) => {
        this.isLoadingButton = false
        this.message.create('error', err);
      },
    });
  }



  goToRegisterPage() {
    let route = 'register';
    this.router.navigate([route]);
  }

  goToForgotPasswordPage() {
    let route  = 'forgotpassword';
    this.router.navigate([route]);
  }

}

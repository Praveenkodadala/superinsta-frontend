import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validateForm!: FormGroup;
  constructor(private fb: NonNullableFormBuilder, private router: Router,) {}

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm() {
    this.validateForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      remember: this.fb.control(true)
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.router.navigate(["dashboard"]);
    } else {
      console.log('Invalid form')
      this.router.navigate(["dashboard"]);
    }
  }
  
  goToRegisterPage() {
    let route = 'register';
    this.router.navigate([route]);
  }
}

import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  validateForm!: FormGroup;

  constructor(private fb: NonNullableFormBuilder, private router: Router,) {}

  ngOnInit(): void {
    this.registerForm();
  }

  registerForm() {
    this.validateForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.fb.control('', [Validators.required]),
      agree: this.fb.control(false, [Validators.requiredTrue]),
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Registration Successful:', this.validateForm.value);
    } else {
      console.log("invalid form")
    }
  }

  goToLoginPage() {
    this.router.navigate(["login"]);
  }

  


}

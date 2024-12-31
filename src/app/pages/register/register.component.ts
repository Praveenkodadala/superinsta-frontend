import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  isLoadingButton = false
  registrationSuccess = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.registrationFormFunc();
  }

  registrationFormFunc() {
    this.registrationForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      agree:[true, [Validators.requiredTrue]]
    },
    );
  }

  submitForm() {
    if (!this.registrationForm.valid) {
      this.message.create('error', 'Please fill in the form correctly.');
      return;
    }
    this.isLoadingButton = true
    const formData = this.registrationForm.value;
    const request = {
      params: formData,
      method: 'POST',
      action_url: '/signup'  //Domin/api/login
    };
    this.httpService.doHttpFormData(request)?.subscribe({
      next: (res: any) => {
        if (res.body.status) {
          this.isLoadingButton = false
          this.registrationForm.reset()
          this.registrationSuccess = true;
          this.message.create('success', res.body.message);
        }
      },
      error: (err) => {
        this.isLoadingButton = false;
        this.message.create('error', err);
      },
    });
  }

  goToLoginPage() {
    this.router.navigate(["login"]);
  }


}

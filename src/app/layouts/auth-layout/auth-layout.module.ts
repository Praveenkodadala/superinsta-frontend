import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../pages/login/login.component';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({

  imports: [
    LoginComponent,
    CommonModule,
    AuthLayoutRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class AuthLayoutModule { }

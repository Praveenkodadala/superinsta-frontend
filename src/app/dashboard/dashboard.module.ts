import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';


@NgModule({
  declarations: [NgZorroAntdModule],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

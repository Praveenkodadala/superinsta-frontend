import { Component } from '@angular/core';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgZorroAntdModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


}

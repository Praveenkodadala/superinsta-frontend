import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';


@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [ 
    NgZorroAntdModule,
    RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}

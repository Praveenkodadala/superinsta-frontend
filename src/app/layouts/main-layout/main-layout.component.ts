import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationStart } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    RouterModule,
    CommonModule,
    NgZorroAntdModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  isCollapsed = false;
  sideMenuData: { title: string; icon: string; url: string }[] = [
    { title: 'Dashboard', icon: 'dashboard', url: 'dashboard' },
    { title: 'Feed', icon: 'appstore', url: 'feed' },
  ];
  avatarUrl: string ='//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  userData = {};

  constructor(private router: Router, private authService: AuthService) {}

  redirect(sideMenuItem: any) {
    let route = [`${sideMenuItem.url}`];
    this.router.navigate(route);
  }

  showModalEditProfile() {}
  showModalChangePassword() {}
  logout() {
    this.authService.logout();
  }
}

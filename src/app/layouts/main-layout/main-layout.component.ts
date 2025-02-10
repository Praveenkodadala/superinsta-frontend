import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationStart } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgZorroAntdModule } from '../../ng-zorro-antd.module';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { SocketService } from '../../services/socket/socket.service';

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
    { title: 'Home', icon: 'home', url: 'home' },
  ];
  avatarUrl: string ='//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  userData:any= {};

  constructor(private router: Router, 
    private authService: AuthService,
    private storageService: StorageService,
    private socketService: SocketService
  ) {
    const storedUserData = this.storageService.getObjectLocalStorage('userData');
    this.userData = storedUserData && Object.keys(storedUserData).length ? storedUserData : {};
    console.log('Logged in user:', this.userData.email);
  }

  ngOnInit(): void {
    const isLoggedIn = !!this.storageService.getLocalStorage('auth-token'); // Checking if user is logged in with token
    if (isLoggedIn) {
      this.socketService.connect(); // Connect to socket after successful login
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect(); // Clean up when component is destroyed
  }

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

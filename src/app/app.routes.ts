import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
        }
      ]
    },
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./layouts/main-layout/main-layout.module').then(m => m.MainLayoutModule)
        }
      ]
    },

  
    {
      path: '**',
      redirectTo: 'login'
    }
  
  ];

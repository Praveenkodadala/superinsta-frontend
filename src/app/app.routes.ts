import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

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
      path: '**',
      redirectTo: 'login'
    }
  
  ];

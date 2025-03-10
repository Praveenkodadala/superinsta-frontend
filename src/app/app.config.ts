import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { JwtModule } from '@auth0/angular-jwt';


registerLocaleData(en);
const tokenGetter = () => localStorage.getItem('auth_token');
const whitelistDomains = ['your-api-domain.com'];

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NZ_I18N, useValue: en_US }, // Provide NZ_I18N token
    importProvidersFrom(FormsModule),
    provideNzIcons(icons),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter
      }
    })),
    provideRouter(routes),
  ]
};


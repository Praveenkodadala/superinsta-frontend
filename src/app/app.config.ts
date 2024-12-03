import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withJsonpSupport()),
    provideAnimationsAsync(),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    provideRouter(routes)
  ]
};

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from './icons-provider';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideNzIcons(), provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(), provideRouter(routes)]
};

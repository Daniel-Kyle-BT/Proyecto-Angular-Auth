import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';

import { jwtInterceptor } from './core/auth/jwt/jwt-interceptor';
import { apiErrorInterceptor } from './core/error/api-error.interceptor';
import { routes } from './app.routes';

export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        jwtInterceptor,
        apiErrorInterceptor
      ])
    ),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: 'https://lucky-patience-production.up.railway.app/api'
      }
    }
  ]
};

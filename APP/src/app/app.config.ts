import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptorsInterceptor } from './core/interceptors/base-url-interceptors-interceptor';
import { environment } from '../environments/environment';

export const BASE_URL = new InjectionToken<string>('BaseUrl');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: BASE_URL, useValue: environment.apiUrl },
    provideHttpClient(withInterceptors([baseUrlInterceptorsInterceptor])),
  ],
};

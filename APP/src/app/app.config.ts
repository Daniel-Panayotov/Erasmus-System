import {
  ApplicationConfig,
  inject,
  InjectionToken,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './core/interceptors/baseUrl-interceptor';
import { environment } from '../environments/environment';
import { TimeoutInterceptor } from './core/interceptors/timeout-interceptor';
import { AuthenticationService } from './features/authentication/services/authentication-service';
import { catchError, EMPTY } from 'rxjs';

export const BASE_URL = new InjectionToken<string>('BaseUrl');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: BASE_URL, useValue: environment.apiUrl },
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    provideAppInitializer(() => {
      const auth = inject(AuthenticationService);
      return auth.refresh().pipe(catchError(() => EMPTY));
    }),
  ],
};

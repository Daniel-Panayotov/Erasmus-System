import {
  ApplicationConfig,
  inject,
  InjectionToken,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { baseUrlInterceptor } from './core/interceptors/baseUrl.interceptor';
import { environment } from '../environments/environment';
import { TimeoutInterceptor } from './core/interceptors/timeout.interceptor';
import { AuthenticationService } from './features/authentication/services/authentication.service';
import { catchError, EMPTY } from 'rxjs';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideIcons } from '@ng-icons/core';
import { requiredIcons } from './shared/utils/icon.provider';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const BASE_URL = new InjectionToken<string>('BaseUrl');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideIcons(requiredIcons),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withComponentInputBinding(),
    ),
    { provide: BASE_URL, useValue: environment.apiUrl },
    provideHttpClient(withInterceptors([baseUrlInterceptor]), withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAppInitializer(() => {
      const auth = inject(AuthenticationService);
      return auth.refresh().pipe(catchError(() => EMPTY));
    }),
  ],
};

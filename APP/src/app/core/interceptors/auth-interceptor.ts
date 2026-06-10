import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../features/authentication/services/authentication-service';
import { catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('/auth')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse, v) => {
        if (err.status !== 401) {
          return throwError(() => err);
        }

        return this.auth.refresh().pipe(switchMap(() => next.handle(req.clone())));
      }),
    );
  }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BASE_URL } from '../../app.config';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(BASE_URL);

  return next(
    req.clone({
      url: `${baseUrl}/${req.url}`,
    }),
  );
};

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  let headers: Record<string, string> = {};

  if (req.url.includes(environment.auth_back_url)) {
    headers['x-ms-authorization-token'] = environment.apikey;

    if (typeof window !== 'undefined') {
      const authToken = sessionStorage.getItem('auth');
      if (authToken) {
        const parseToken = JSON.parse(authToken);
        const accessToken = parseToken.access_token;
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
  }

  req = req.clone({ setHeaders: headers });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && typeof window !== 'undefined') {
        return userService.refreshToken().pipe(
          switchMap((res: any) => {
            sessionStorage.setItem('auth', JSON.stringify(res));

            const newReq = req.clone({
              setHeaders: {
                ...headers,
                Authorization: `Bearer ${res.access_token}`
              }
            });

            return next(newReq);
          }),
          catchError((refreshError: HttpErrorResponse) => {
            if (refreshError.status === 401) {
              sessionStorage.removeItem('auth');
              sessionStorage.removeItem('user');
              sessionStorage.removeItem('userId');
            }
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

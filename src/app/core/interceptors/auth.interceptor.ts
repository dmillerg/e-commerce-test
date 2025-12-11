import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(environment.auth_back_url)) {
    req = req.clone({
      setHeaders: {
        'x-ms-authorization-token': environment.apikey
      }
    });
  }

  return next(req);
};

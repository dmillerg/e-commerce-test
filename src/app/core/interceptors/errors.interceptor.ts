import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { ERROR_MESSAGES } from '../consts/http-errors';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const notif = ERROR_MESSAGES[error.status] || ERROR_MESSAGES.default;
      notificationService.push(notif.title, notif.message, 5000, 'ERROR');
      return throwError(() => error);
    }));
}
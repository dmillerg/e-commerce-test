import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStore } from '../stores/user.store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userStore = inject(UserStore);

  const user = userStore.getUser();

  if (user) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};

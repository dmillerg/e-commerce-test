import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { User } from '../models/user';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<{ user: User | null }>({
    user: null
  }),
  withMethods((store) => {
    const platformId = inject(PLATFORM_ID);

    return {
      setUser(user: User) {
        patchState(store, { user });

        if (isPlatformBrowser(platformId)) {
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('userId', user.id.toString());
        }
      },

      clearUser() {
        patchState(store, { user: null });

        if (isPlatformBrowser(platformId)) {
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('userId');
        }
      },

      getUser(): User | null {
        return store.user();
      }
    };
  }),
  withHooks({
    onInit(store) {
      const platformId = inject(PLATFORM_ID);

      if (isPlatformBrowser(platformId)) {
        const userStr = sessionStorage.getItem('user');
        const userIdStr = sessionStorage.getItem('userId');

        if (userStr && userIdStr) {
          try {
            const user: User = JSON.parse(userStr);
            patchState(store, { user });
          } catch (e) {
            console.error('Error parsing user from sessionStorage', e);
          }
        }
      }
    }
  })
);

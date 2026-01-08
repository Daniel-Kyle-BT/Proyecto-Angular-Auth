import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { PlatformService } from '@core/config/platform.service';
import { AuthService } from './auth-service';
import { AuthState } from './auth-state';


export const authResolver: ResolveFn<boolean> = () => {
  const auth = inject(AuthService);
  const state = inject(AuthState);
  const platform = inject(PlatformService);

  if (!platform.isBrowser) {
    return true;
  }

  if (state.isAuthenticated()) {
    return true;
  }

  const token = state.token();
  if (!token) {
    return false;
  }

  return auth.me().pipe(
    tap(user => state.setSession(token, user)),
    map(() => true),
    catchError(() => {
      state.clear();
      return of(false);
    })
  );
};

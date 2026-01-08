import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../auth/auth-state';

export const loginGuard: CanActivateFn = () => {
  const state = inject(AuthState);
  const router = inject(Router);

  if (state.isAuthenticated()) {
    router.navigateByUrl('/home/inicio');
    return false;
  }

  return true;
};

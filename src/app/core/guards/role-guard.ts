import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../auth/auth-state';
import { Role } from '@core/config/auth-constants';

export const roleGuard = (allowedRoles: readonly Role[]): CanActivateFn => {
  return () => {
    const state = inject(AuthState);
    const router = inject(Router);

    const userRol = state.rol(); 

    if (userRol && allowedRoles.includes(userRol)) {
      return true;
    }

    console.warn('Acceso denegado: Rol insuficiente');
    router.navigateByUrl('/home/inicio');
    return false;
  };
};

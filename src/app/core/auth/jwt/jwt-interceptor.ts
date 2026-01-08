import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PlatformService } from '@core/config/platform.service';
import { AuthState  } from '../auth-state';


const EXCLUDED  = ['/auth/login', '/auth/register'];

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  const platform = inject(PlatformService);
  const state = inject(AuthState);

  if (!platform.isBrowser) {
    return next(req);
  }
  
  if (EXCLUDED.some(url => req.url.endsWith(url))) {
    return next(req);
  }

  if (state.isTokenExpired()) {
    state.clear();
    return next(req);
  }

  const token = state.token();
  if (!token) return next(req);

  return next(req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};

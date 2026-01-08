import { Routes } from '@angular/router';
import { authResolver } from '@core/auth/auth-resolver';
import { authGuard } from '@core/guards/auth-guard';
import { loginGuard } from '@core/guards/login-guard';
import { roleGuard } from '@core/guards/role-guard';

import { AuthPage } from '@features/auth/auth';
import { HomePage } from '@features/home/home';
import { InicioHome } from '@features/pages/inicio-home/inicio-home';
import { RecursosHumanos } from '@features/pages/recursos-humanos/recursos-humanos';
import { ROLES } from '@core/config/auth-constants';

export const routes: Routes = [
  { path: '', component: AuthPage, canActivate: [loginGuard] },
  
  {
    path: 'home',
    component: HomePage,
    canActivate: [authGuard],
    resolve: { auth: authResolver },
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioHome },

      { path: 'empleado', component: RecursosHumanos/*, canActivate: [roleGuard([ROLES.ADMIN, ROLES.SUPERVISOR])]*/ }
    ]
  },

  { path: '**', redirectTo: '' }
];
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { PlatformService } from '@core/config/platform.service';
import { Usuario } from './auth.models';
import { APP_CONFIG } from '../../app.config';
import { AuthState } from './auth-state';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private state = inject(AuthState);
  private config = inject(APP_CONFIG);
  
  private platform = inject(PlatformService);

  login(username: string, password: string) {
    if (!this.platform.isBrowser) {
      return throwError(() => new Error('SSR disabled'));
    }
    return this.http
      .post<{ token: string }>(
        `${this.config.apiUrl}/auth/login`,
        { username, password }
      )
      .pipe(
        tap(res => {
          this.state.setSession(res.token, null as any);
        }),
        switchMap(res =>
          this.http.get<Usuario>(`${this.config.apiUrl}/me`).pipe(
            tap(user => this.state.setSession(res.token, user))
          )
        ),
      catchError(err => {
        this.state.clear();
        return throwError(() => err);
      })
      );
  }

  register(request: {
    username: string;
    password: string;
    codigoEmpleado: string;
  }) {
    if (!this.platform.isBrowser) {
      return throwError(() => new Error('SSR disabled'));
    }
    return this.http.post<void>(
      `${this.config.apiUrl}/auth/register`,
      request
    );
  }

  me() {
    if (!this.platform.isBrowser) {
      return throwError(() => new Error('SSR disabled'));
    }
    return this.http.get<Usuario>(`${this.config.apiUrl}/me`);
  }

  logout(): void {
    this.state.clear();
  }
}
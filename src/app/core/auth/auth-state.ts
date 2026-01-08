import { Injectable, computed, inject, signal } from '@angular/core';
import { StorageService } from '@core/storage/storage-service';
import { PlatformService } from '@core/config/platform.service';
import { AUTH_KEYS, Role, toRole } from '@core/config/auth-constants';
import { Usuario } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthState {

  private storage = inject(StorageService);
  private platform = inject(PlatformService);

  private _token = signal<string | null>(
     this.platform.isBrowser ? this.storage.get<string>(AUTH_KEYS.TOKEN) : null
  );

  private _user = signal<Usuario | null>(null);

  readonly token = this._token.asReadonly();
  readonly user = this._user.asReadonly();

  readonly isTokenExpired = computed(() => {
    const token = this._token();
    if (!token) return true;
    if (!this.platform.isBrowser) return false; // SSR nunca invalida token

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  });

  readonly isAuthenticated = computed(() =>
    !!this._token() && !this.isTokenExpired()
  );

  readonly rol = computed<Role | null>(() =>
    toRole(this._user()?.rol ?? null)
  );

  setSession(token: string, user: Usuario): void {
    this._token.set(token);
    this._user.set(user);

    if (this.platform.isBrowser) {
      this.storage.set(AUTH_KEYS.TOKEN, token);
    }
  }

  clear(): void {
    this._token.set(null);
    this._user.set(null);

    if (this.platform.isBrowser) {
      this.storage.remove(AUTH_KEYS.TOKEN);
    }
  }
}

import { inject, Injectable } from '@angular/core';
import { PlatformService } from '@core/config/platform.service';

@Injectable({ providedIn: 'root' })
export class StorageService {

  private platform = inject(PlatformService);

  get<T>(key: string): T | null {
    if (!this.platform.isBrowser) return null;

    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.platform.isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    if (!this.platform.isBrowser) return;
    localStorage.removeItem(key);
  }
}
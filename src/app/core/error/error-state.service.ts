import { Injectable, signal } from '@angular/core';
import { ApiProblemDetail } from './api-problem-detail.model';
import { STATUS_UI, UiError } from './ui-error.model';

@Injectable({ providedIn: 'root' })
export class ErrorStateService {
  private readonly _error = signal<UiError | null>(null);
  readonly error = this._error.asReadonly();

  private timer?: number;

  show(problem: ApiProblemDetail, autoCloseMs = 5000) {
    this._error.set(this.toUiError(problem));

    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.clear(), autoCloseMs);
  }


  clear() {
    this._error.set(null);
  }

  private toUiError(p: ApiProblemDetail): UiError {
    const cfg = STATUS_UI[p.status as keyof typeof STATUS_UI];

    if (cfg) {
      return {
        title: cfg.title,
        message: p.detail,
        origin: p.origin,
        instance: p.instance,
        spStatusCode: p.status,
        level: cfg.level
      };
    }

    return {
      title: this.resolveTitleByOrigin(p.origin),
      message: p.detail,
      origin: p.origin,
      instance: p.instance,
      spStatusCode: p.status,
      level: 'error'
    };
  }

  private resolveTitleByOrigin(origin?: ApiProblemDetail['origin']): string {
    switch (origin) {
      case 'DATABASE':
        return 'Conflicto de datos';
      case 'BUSINESS':
        return 'Regla de negocio';
      case 'SECURITY':
        return 'Acceso denegado';
      default:
        return 'Error del sistema';
    }
  }
}


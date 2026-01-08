export interface UiError {
  title: string;
  message: string;
  origin?: string;
  instance: string;
  spStatusCode?: number;
  level: 'info' | 'warning' | 'error' | 'critical';
}

export const STATUS_UI = {
  400: { title: 'Error de validación', level: 'warning' },
  401: { title: 'Acceso no autorizado', level: 'info' },
  403: { title: 'Regla de negocio', level: 'warning' },
  404: { title: 'Recurso inexistente', level: 'warning' },
  409: { title: 'Conflicto de datos', level: 'warning' },
  500: { title: 'Error técnico', level: 'critical' }
} as const;
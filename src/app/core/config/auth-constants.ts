import { ApiProblemDetail } from "@core/error/api-problem-detail.model";

export const AUTH_KEYS = {
  TOKEN: 'auth_token'
} as const;

export const ROLES = {
  ADMIN: 'Administrador',
  SUPERVISOR: 'SUPERVISOR_OPERACIONES'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export function toRole(value: string | null): Role | null {
  if (!value) return null;

  return (Object.values(ROLES) as readonly string[]).includes(value)
    ? (value as Role)
    : null;
}

export function normalizeProblem(p: ApiProblemDetail): ApiProblemDetail {
  if (!p.origin && p.properties?.origin) {
    p.origin = p.properties.origin;
  }
  return p;
}
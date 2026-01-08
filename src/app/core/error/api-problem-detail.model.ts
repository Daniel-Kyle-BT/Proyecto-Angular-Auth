export interface ApiProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  origin?: 'DATABASE' | 'BUSINESS' | 'SECURITY' | 'SPRING';
  spStatusCode?: number;
}

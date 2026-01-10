export interface ApiProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  origin?: 'DATABASE' | 'BUSINESS' | 'SECURITY' | 'SPRING';
  errors?: { field: string; message: string }[];
  properties?: {
    origin?: ApiProblemDetail['origin'];
  };
}

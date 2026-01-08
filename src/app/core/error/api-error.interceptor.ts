import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorStateService } from './error-state.service';
import { ApiProblemDetail } from './api-problem-detail.model';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorState = inject(ErrorStateService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const problem = err.error as ApiProblemDetail;

      if (problem?.type) {
        errorState.show(problem);
        return throwError(() => problem);
      }

      return throwError(() => err);
    })
  );
};
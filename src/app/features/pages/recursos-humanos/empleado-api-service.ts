// features/pages/recursos-humanos/empleado-api-service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';
import { EmpleadoListDTO, EmpleadoDetailDTO, EmpleadoCreateUpdateDTO } from './model/empleado.model';



@Injectable({ providedIn: 'root' })
export class EmpleadoApiService {

  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  private baseUrl = `${this.config.apiUrl}/empleado`;

  // LISTAR (con filtros opcionales)
  listar(params?: {
    search?: string;
    cargoId?: number;
    distritoId?: string;
    provinciaId?: string;
    departamentoId?: string;
  }) {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    return this.http.get<EmpleadoListDTO[]>(
      this.baseUrl,
      { params: httpParams }
    );
  }

  detalle(codigo: string) {
    return this.http.get<EmpleadoDetailDTO>(
      `${this.baseUrl}/${codigo}`
    );
  }

  crear(dto: EmpleadoCreateUpdateDTO) {
    return this.http.post<void>(
      this.baseUrl,
      dto
    );
  }

  actualizar(codigo: string, dto: EmpleadoCreateUpdateDTO) {
    return this.http.put<void>(
      `${this.baseUrl}/${codigo}`,
      dto
    );
  }

  // ELIMINAR (soft delete)
  eliminar(codigo: string) {
    return this.http.delete<void>(
      `${this.baseUrl}/${codigo}`
    );
  }
}

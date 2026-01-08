// features/pages/catalogs/ubicacion-api-service.ts
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { APP_CONFIG } from "app/app.config";
import { IdNombreDTO } from "./id-nombre-dto";


@Injectable({ providedIn: 'root' })
export class CatalogosApiService {

  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  cargos() {
    return this.http.get<IdNombreDTO[]>(
      `${this.config.apiUrl}/catalogos/cargos`
    );
  }

  departamentos() {
    return this.http.get<IdNombreDTO[]>(
      `${this.config.apiUrl}/catalogos/dptos`
    );
  }

  provincias(departamentoId: string) {
    return this.http.get<IdNombreDTO[]>(
      `${this.config.apiUrl}/catalogos/dptos/${departamentoId}/provincias`
    );
  }

  distritos(provinciaId: string) {
    return this.http.get<IdNombreDTO[]>(
      `${this.config.apiUrl}/catalogos/provincias/${provinciaId}/distritos`
    );
  }
}

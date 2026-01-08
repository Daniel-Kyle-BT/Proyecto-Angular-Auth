// features/pages/recursos-humanos/recursos-humanos.ts
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, distinctUntilChanged, map  } from 'rxjs';

import { CatalogosApiService } from '@features/catalogs/catalogos-api-service';
import { EmpleadoApiService } from './empleado-api-service';
import { EmpleadoDetailDTO, EmpleadoListDTO } from './model/empleado.model';
import { IdNombreDTO } from '@features/catalogs/id-nombre-dto';

import { SelectComponent } from '@shared/components/atoms/select/select';
import { EmpleadoTableComponent } from "./empleado-table/empleado-table";
import { EmpleadoFormComponent } from "./empleado-form/empleado-form";

@Component({
  selector: 'app-recursos-humanos',
  standalone: true,
  imports: [CommonModule, SelectComponent, EmpleadoTableComponent, EmpleadoFormComponent],
  templateUrl: './recursos-humanos.html',
  styleUrl: './recursos-humanos.css'
})
export class RecursosHumanos {

  private catalogosApi = inject(CatalogosApiService);
  private empleadoApi = inject(EmpleadoApiService);

  // ===== STATE =====
  empleados = signal<EmpleadoListDTO[]>([]);

  cargos = signal<IdNombreDTO[]>([]);
  departamentos = signal<IdNombreDTO[]>([]);
  provincias = signal<IdNombreDTO[]>([]);
  distritos = signal<IdNombreDTO[]>([]);

  showForm = signal(false);
  selectedEmpleado = signal<EmpleadoDetailDTO | null>(null);

  filtros = signal({
    search: '',
    cargoId: undefined as number | undefined,
    departamentoId: undefined as string | undefined,
    provinciaId: undefined as string | undefined,
    distritoId: undefined as string | undefined,
  });

  constructor() {

    this.catalogosApi.cargos().subscribe(this.cargos.set);
    this.catalogosApi.departamentos().subscribe(this.departamentos.set);

    // Provincias por departamento
    toObservable(this.filtros).pipe(
      map(f => f.departamentoId),
      distinctUntilChanged(),
      switchMap(depId => {
        this.provincias.set([]);
        this.distritos.set([]);
        return depId ? this.catalogosApi.provincias(depId) : of([]);
      })
    ).subscribe(this.provincias.set);

    // Distritos por provincia
    toObservable(this.filtros).pipe(
      map(f => f.provinciaId),
      distinctUntilChanged(),
      switchMap(provId => {
        this.distritos.set([]);
        return provId ? this.catalogosApi.distritos(provId) : of([]);
      })
    ).subscribe(this.distritos.set);

    // Listado empleados
    toObservable(this.filtros).pipe(
      switchMap(f => this.empleadoApi.listar(f))
    ).subscribe(this.empleados.set);
  }

  // ===== FILTROS =====
  onFiltroChange(
    key: keyof ReturnType<typeof this.filtros>,
    value: string | number | undefined
  ) {
    this.filtros.update(f => {
      if (key === 'departamentoId') {
        return { ...f, departamentoId: value as string | undefined, provinciaId: undefined, distritoId: undefined };
      }
      if (key === 'provinciaId') {
        return { ...f, provinciaId: value as string | undefined, distritoId: undefined };
      }
      return { ...f, [key]: value };
    });
  }


  // ===== CRUD UI =====
  nuevoEmpleado() {
    this.selectedEmpleado.set(null);
    this.showForm.set(true);
  }

  editarEmpleado(emp: EmpleadoListDTO) {
    this.empleadoApi.detalle(emp.codigo)
      .subscribe(det => {
        this.selectedEmpleado.set(det);
        this.showForm.set(true);
      });
  }

  onFormClose(refresh: boolean) {
    this.showForm.set(false);
    if (refresh) {
      this.filtros.update(f => ({ ...f }));
    }
  }

  eliminarEmpleado(codigo: string) {
    if (!confirm('¿Eliminar empleado?')) return;
    this.empleadoApi.eliminar(codigo).subscribe(() => {
      this.filtros.update(f => ({ ...f }));
    });
  }

  onSave() {
    this.showForm.set(false);
  }

  onCancel() {
    this.showForm.set(false);
  }
}
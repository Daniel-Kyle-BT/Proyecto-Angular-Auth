import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';

import { EmpleadoApiService } from '../empleado-api-service';
import { CatalogosApiService } from '@features/catalogs/catalogos-api-service';
import { SelectComponent } from '@shared/components/atoms/select/select';
import { IdNombreDTO } from '@features/catalogs/id-nombre-dto';
import { EmpleadoDetailDTO, EmpleadoCreateUpdateDTO } from '../model/empleado.model';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-form.html',
  styleUrl: './empleado-form.css'
})
export class EmpleadoFormComponent {

  private fb = inject(FormBuilder);
  private empleadoApi = inject(EmpleadoApiService);
  private catalogosApi = inject(CatalogosApiService);

  @Input() empleado: EmpleadoDetailDTO | null = null;

  @Output() close = new EventEmitter<boolean>(); // true = refrescar

  cargos: IdNombreDTO[] = [];
  departamentos: IdNombreDTO[] = [];
  provincias: IdNombreDTO[] = [];
  distritos: IdNombreDTO[] = [];

  form = this.fb.nonNullable.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: ['', Validators.required],
    telefono: [''],

    departamentoId: [undefined as string | undefined],
    provinciaId: [undefined as string | undefined],
    distritoId: [undefined as string | undefined, Validators.required],

    cargo: [undefined as number | undefined, Validators.required]
  });

  // constructor() {
  //   this.catalogosApi.cargos().subscribe(r => this.cargos = r);
  //   this.catalogosApi.departamentos().subscribe(r => this.departamentos = r);

  //   // Provincias
  //   // Provincias por departamento
  //   toObservable(this.form.controls.departamentoId.valueChanges).pipe(
  //     distinctUntilChanged(),
  //     switchMap(dep =>
  //       dep ? this.catalogosApi.provincias(dep) : of([])
  //     )
  //   ).subscribe(r => {
  //     this.provincias = r;
  //     this.form.patchValue({ provinciaId: undefined, distritoId: undefined });
  //     this.distritos = [];
  //   });

  //   // Distritos por provincia
  //   toObservable(this.form.controls.provinciaId.valueChanges).pipe(
  //     distinctUntilChanged(),
  //     switchMap(prov =>
  //       prov ? this.catalogosApi.distritos(prov) : of([])
  //     )
  //   ).subscribe(r => {
  //     this.distritos = r;
  //     this.form.patchValue({ distritoId: undefined });
  //   });
  // }

  ngOnInit() {
    if (!this.empleado) return;

    // Campos editables
    this.form.patchValue({
      codigo: this.empleado.codigo,
      nombre: this.empleado.nombre,
      apellido: this.empleado.apellido,
      dni: this.empleado.dni,
      telefono: this.empleado.telefono
    });

    // Código no editable en edición
    this.form.controls.codigo.disable();
  }

  guardar() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const dto: EmpleadoCreateUpdateDTO = {
      codigo: raw.codigo,
      nombre: raw.nombre,
      apellido: raw.apellido,
      dni: raw.dni,
      telefono: raw.telefono,
      distritoId: raw.distritoId!,
      cargo: raw.cargo!
    };

    const req$ = this.empleado
      ? this.empleadoApi.actualizar(dto.codigo, dto)
      : this.empleadoApi.crear(dto);

    req$.subscribe(() => this.close.emit(true));
  }
  cancelar() {
    this.close.emit(false);
  }
}
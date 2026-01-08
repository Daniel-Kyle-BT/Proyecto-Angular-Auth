// features/tablas/empleado/empleado-table/empleado-table.ts
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoListDTO } from '../model/empleado.model';

@Component({
  selector: 'app-empleado-table',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './empleado-table.html',
  styleUrls: ['./tabla.css']
})

export class EmpleadoTableComponent{
  @Input({ required: true })
  empleados: EmpleadoListDTO[] = [];

  @Output()
  editarEmpleado = new EventEmitter<EmpleadoListDTO>();
  
  @Output() 
  eliminarEmpleado = new EventEmitter<string>();

  trackByCodigo = (_: number, emp: EmpleadoListDTO) => emp.codigo;
}
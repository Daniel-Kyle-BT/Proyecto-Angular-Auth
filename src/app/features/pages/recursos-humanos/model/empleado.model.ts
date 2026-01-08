export interface EmpleadoListDTO {
  codigo: string;
  nombre: string;
  apellido: string;
  cargo: string;
  distrito: string;
  provincia: string;
  departamento: string;
}

export interface EmpleadoDetailDTO {
  codigo: string;
  nombre: string;
  apellido: string;
  cargo: string;
  distrito: string;
  provincia: string;
  departamento: string;
  dni: string;
  telefono: string;
}

export interface EmpleadoCreateUpdateDTO {
  codigo: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  distritoId: string;  
  cargo: number;
}



import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IdNombreDTO } from '@features/catalogs/id-nombre-dto';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
})

export class SelectComponent {
  @Input() label = '';
  @Input() items: IdNombreDTO[] = [];
  @Input() value: string | number | undefined;
  @Input() disabled = false;
  @Input() containerClass = 'cbo-listar';
  @Input() parseAs: 'string' | 'number' = 'string';

  @Output() valueChange = new EventEmitter<string | number | undefined>();

  onChange(event: Event) {
    const raw = (event.target as HTMLSelectElement).value;
    if (!raw) return this.valueChange.emit(undefined);

    this.valueChange.emit(
      this.parseAs === 'number' ? +raw : raw
    );
  }

  trackById = (_: number, item: IdNombreDTO) => item.id;
}

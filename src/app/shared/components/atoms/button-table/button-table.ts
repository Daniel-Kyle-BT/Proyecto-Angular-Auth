import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-table',
  standalone: true,
  imports: [],
  templateUrl: './button-table.html',
  styleUrl: './button-table.css',
})
export class ButtonTableComponent {
  @Input() classes = '';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

}

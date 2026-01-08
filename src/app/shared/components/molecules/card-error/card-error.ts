import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-error',
  standalone: true,
  imports: [],
  templateUrl: './card-error.html',
  styleUrl: './card-error.css',
})
export class CardErrorComponent {     
  origin = input<string>(); 
  statusCode = input<number>();
  instancia = input<string>(); 
}

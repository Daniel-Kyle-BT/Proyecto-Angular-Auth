import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'penCurrency',
  standalone: true
})
export class PenCurrencyPipe implements PipeTransform {

  private formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  });

  transform(value: number | string | null | undefined): string {
    const amount =
      typeof value === 'string' ? Number(value) : value;

    if (amount == null || isNaN(amount)) {
      return 'S/ 0.00';
    }

    return this.formatter.format(amount);
  }
}
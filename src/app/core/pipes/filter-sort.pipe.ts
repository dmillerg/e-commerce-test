import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSort',
  standalone: true,
})
export class FilterSortPipe implements PipeTransform {
  transform(value: any[], args?: any) {
    if (!value) return null;
    if (!args) return value;
    args = args.toLowerCase();
    if (args === 'nombre')
      return value.sort((a, b) => a.title.localeCompare(b.title));
    if (args === 'precio') return value.sort((a, b) => a.price - b.price);
    return value.sort((a, b) => a[args].localeCompare(b[args]));
  }
}

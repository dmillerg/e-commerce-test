import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'categorysPrice',
  standalone: true
})
export class CategorysPricePipe implements PipeTransform {

  transform(
    value: Product[],
    args?: { categories?: string[]; currentPrice?: number }
  ): Product[] | [] {
    if (!value) return [];
    if (!args) return value;

    return value.filter(e => {
      const byPrice =
        args.currentPrice && args.currentPrice > 0
          ? e.price <= args.currentPrice
          : true;

      const byCategory =
        args.categories && args.categories.length > 0
          ? args.categories.includes(e.category)
          : true;

      return byPrice && byCategory;
    });
  }
}

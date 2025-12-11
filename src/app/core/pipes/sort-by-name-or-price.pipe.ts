import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortNamePrice',
    standalone: true,
})
export class SortPipe implements PipeTransform {
    transform(array: any[], order: string): any[] {
        if (!array || array.length === 0 || !order) return array;

        return array.sort((a, b) => {
            switch (order) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'name_asc':
                    return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1; 
                case 'name_desc':
                    return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
                default:
                    return 0;
            }
        });
    }
}

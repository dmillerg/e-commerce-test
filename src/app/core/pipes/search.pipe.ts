import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    standalone: true,
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items || items.length === 0) return []; 
        if (!searchText) return items;

        searchText = searchText.toLowerCase(); 

        return items.filter(item => {
            return Object.values(item).some((value:any) =>
                value?.toString().toLowerCase().includes(searchText)
            );
        });
    }
}

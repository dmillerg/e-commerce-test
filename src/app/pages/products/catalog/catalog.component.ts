import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Option, OptionCheck } from '@app/core/models/option';
import { Product } from '@app/core/models/product';
import { SearchPipe } from '@app/core/pipes/search.pipe';
import { SortPipe } from '@app/core/pipes/sort-by-name-or-price.pipe';
import { ProductsService } from '@app/core/services/products.service';
import { DropdownComponent } from '@app/shared/components/dropdown/dropdown.component';
import { forkJoin, mergeMap, take } from 'rxjs';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { PaginatorComponent } from '@app/shared/components/paginator/paginator.component';
import { AccordionComponent } from '@app/shared/components/accordion/accordion.component';
import { CategorysPricePipe } from '@app/core/pipes/categorys-price.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DropdownComponent, SortPipe, SearchPipe, ProductCardComponent, PaginatorComponent, AccordionComponent, CategorysPricePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  providers: [ProductsService, CategorysPricePipe]
})
export class CatalogComponent implements OnInit {

  protected currentPage: number = 1;

  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductsService);
  private readonly categoryPricePipe = inject(CategorysPricePipe);

  protected openSidebar: boolean = false;
  protected sortValue: string = 'nombre_asc';

  protected sortBy: Option[] = [
    { name: 'Precio (Mayor a menor)', value: 'price_desc' }, { name: 'Precio (Menor a mayor)', value: 'price_asc' },
    { name: 'Nombre (Mayor a menor)', value: 'name_desc' }, { name: 'Nombre (Mayor a menor)', value: 'name_asc' }
  ]

  protected frmSearch = this.fb.group({
    search: [null]
  });

  protected products: Product[] = [];
  protected catalog: Product[] = [];
  protected catalogAll: Product[] = [];
  protected categories: OptionCheck[] = [];
  protected maxPrice: number = 0;
  protected minPrice: number = 0;
  protected filter: { categories: string[], currentPrice: number } = { categories: [], currentPrice: 0 };

  ngOnInit(): void {
    this.getProducts()
  }

  private getProducts() {
  this.productService.getProducts().pipe(
    take(1),
    mergeMap((response) => {
      this.catalogAll = response;
      this.setPage(1);

      const counts = response.reduce((acc: Record<string, number>, product: any) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});
      this.categories = Object.keys(counts).map(cat => ({
        name: cat,
        value: cat,
        checked: false,
        cant: counts[cat]
      }));

      const prices = response.map((p: any) => p.price);
      this.maxPrice = Math.max(...prices);
      this.minPrice = Math.min(...prices);

      const detailRequests = response.map(p =>
        this.productService.getSingleProduct(p.id).pipe(take(1))
      );

      return forkJoin(detailRequests);
    })
  ).subscribe({
    next: (fullProducts: Product[]) => {
      this.catalog = fullProducts;
      this.catalogAll = fullProducts;
      this.setPage(1)
      console.log('Productos detallados:', this.catalog);
    }
  });
}


  setPage(page: number) {
    if (page < 1 || page > this.catalog.length) return;

    this.currentPage = (page);

    const start = (page - 1) * 10;
    const end = start + 10;

    this.products = this.catalog.slice(start, end);
  }

  protected applyFilter(){
    this.catalog =this.categoryPricePipe.transform(this.catalogAll,this.filter);
    this.setPage(1)
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@app/core/services/products.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [ProductsService]
})
export class DetailComponent implements OnInit {

  protected product: any;
  private readonly productService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  quantity = 1;

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productService.getSingleProduct(id).pipe(take(1)).subscribe({
      next: (response) => {
        this.product = response
      }
    })
  }

  handleDecreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  handleIncreaseQuantity() {
    this.quantity++;
  }

  handleImageError(e: any) { }
}

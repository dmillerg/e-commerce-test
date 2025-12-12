import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@app/core/services/products.service';
import { take } from 'rxjs';
import { RatingsComponent } from '../components/ratings/ratings.component';
import { CartStore } from '@app/core/stores/cart.store';
import { CartService } from '@app/core/services/cart.service';
import { Product } from '@app/core/models/product';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RatingsComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [ProductsService, CartService]
})
export class DetailComponent implements OnInit {

  protected product?: Product;
  private readonly productService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartStore = inject(CartStore);
  private readonly platformId = inject(PLATFORM_ID);
  protected isLog = isPlatformBrowser(this.platformId) ? sessionStorage.getItem('userId') : null;


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

  addCart() {
    const cart = { ...this.product!, productId: this.product!.id, quantity: this.quantity }
    this.cartStore.addProduct(cart);
    sessionStorage.setItem('cart', JSON.stringify(this.cartStore.getCart()))
  }
}

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartResumeComponent } from '../components/cart-resume/cart-resume.component';
import { CartService } from '@app/core/services/cart.service';
import { Cart } from '@app/core/models/cart';
import { RouterLink } from "@angular/router";
import { ProductsService } from '@app/core/services/products.service';
import { ProductCart } from '@app/core/models/product';
import { CartStore } from '@app/core/stores/cart.store';
import { FallbackImagesTsDirective } from '@app/core/directives/fallback-images.ts.directive';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartResumeComponent, CommonModule, RouterLink, FallbackImagesTsDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartService, ProductsService]
})
export class CartComponent implements OnInit {

  protected cart?: Cart;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cartStore = inject(CartStore);

  ngOnInit(): void {
    this.getCartData()
  }

  private getCartData() {
    if (isPlatformBrowser(this.platformId)) {
      const cart = sessionStorage.getItem('cart');
      if (cart) {
        this.cart = JSON.parse(cart);
      } else {
        this.cart = {
          userId: 0,
          products: []
        }
      }
    }
  }

  protected getSubtotal() {
    return this.cart?.products.reduce((acc, r) => acc + (r.price * r.quantity), 0) ?? 0;
  }

  protected cantProducts(): number {
    return this.cart?.products.reduce((acc, r) => acc + r.quantity, 0) ?? 0;
  }

  protected deleteProductCart(id: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartStore.removeProduct(id);
    setTimeout(() => {
      this.getCartData()
    }, 100);
  }

  protected handleDecreaseQuantity(item: ProductCart, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    item.quantity--;
    this.cartStore.updateQuantity(item.id,-1);
  }

  protected handleIncreaseQuantity(item: ProductCart, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    item.quantity++;
    this.cartStore.updateQuantity(item.id,1);
  }
}

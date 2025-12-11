import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartResumeComponent } from '../components/cart-resume/cart-resume.component';
import { CartService } from '@app/core/services/cart.service';
import { take } from 'rxjs';
import { Cart } from '@app/core/models/cart';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartResumeComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartService]
})
export class CartComponent implements OnInit {

  subtotal: number = 80;
  protected cart?: Cart;
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.getCartData()
  }

  private getCartData() {
    this.cartService.getCart(1).pipe(take(1)).subscribe({
      next: (response) => {
        this.cart = response
      }
    })
  }

protected cantProducts(): number {
  return this.cart?.products.reduce((acc, r) => acc + r.quantity, 0) ?? 0;
}
}

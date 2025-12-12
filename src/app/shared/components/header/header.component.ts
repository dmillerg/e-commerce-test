import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TooltipDirective } from '@app/core/directives/tootltip.directive';
import { Cart } from '@app/core/models/cart';
import { CartStore } from '@app/core/stores/cart.store';
import { UserStore } from '@app/core/stores/user.store';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, TooltipDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  protected platformName = environment.platformName;
  private readonly cartStore = inject(CartStore);
  protected userStore = inject(UserStore);
  private readonly platformId = inject(PLATFORM_ID);

  menuOpen = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cart = sessionStorage.getItem('cart');
      if (cart) {
        const cartJson: Cart = JSON.parse(cart);
        cartJson.products.forEach(e => this.cartStore.addProduct(e));
      }
    }
  }

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  total = computed(() =>
    this.cartStore.products().length
  );
}

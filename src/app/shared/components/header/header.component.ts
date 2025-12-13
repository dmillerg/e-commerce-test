import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FallbackImagesTsDirective } from '@app/core/directives/fallback-images.ts.directive';
import { TooltipDirective } from '@app/core/directives/tootltip.directive';
import { Cart } from '@app/core/models/cart';
import { AuthService } from '@app/core/services/auth.service';
import { CartStore } from '@app/core/stores/cart.store';
import { UserStore } from '@app/core/stores/user.store';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, TooltipDirective, FallbackImagesTsDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  protected platformName = environment.platformName;
  private readonly cartStore = inject(CartStore);
  protected userStore = inject(UserStore);
  protected authService = inject(AuthService);
  private readonly router = inject(Router);
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

  protected logout() {
    this.authService.logout();
    this.userStore.clearUser();
    this.cartStore.clearCart();
    this.router.navigate(['auth']);
  }
}

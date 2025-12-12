import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { ProductCart } from '../models/product';
import { Cart } from '../models/cart';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, effect } from '@angular/core';

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState<Cart>({
    id: 0,
    userId: 0,
    products: []
  }),
  withMethods((store) => {
    const platformId = inject(PLATFORM_ID);

    return {
      addProduct(product: ProductCart) {
        let userId = store.userId();
        if (isPlatformBrowser(platformId)) {
          const storedUserId = sessionStorage.getItem('userId');
          if (storedUserId) {
            userId = Number(storedUserId);
          }
        }

        const existing = store.products().find(p => p.productId === product.productId);

        if (existing) {
          patchState(store, {
            userId,
            products: store.products().map(p =>
              p.productId === product.productId
                ? { ...p, quantity: p.quantity + product.quantity }
                : p
            )
          });
        } else {
          patchState(store, {
            userId,
            products: [...store.products(), product]
          });
        }
      },

      removeProduct(productId: number) {
        patchState(store, {
          products: store.products().filter(p => p.productId !== productId)
        });
      },

      updateQuantity(productId: number, delta: number) {
        const existing = store.products().find(p => p.productId === productId);

        if (existing) {
          const newQuantity = existing.quantity + delta;

          if (newQuantity > 0) {
            patchState(store, {
              products: store.products().map(p =>
                p.productId === productId
                  ? { ...p, quantity: newQuantity }
                  : p
              )
            });
          } else {
            patchState(store, {
              products: store.products().filter(p => p.productId !== productId)
            });
          }
        } else {
          if (delta > 0) {
            patchState(store, {
              products: [...store.products(), { productId, quantity: delta } as ProductCart]
            });
          }
        }
      },


      clearCart() {
        patchState(store, { products: [] });
        if (isPlatformBrowser(platformId)) {
          sessionStorage.removeItem('cart');
        }
      },

      getCart(): Cart {
        return {
          id: store.id?.(),
          userId: store.userId(),
          products: store.products()
        };
      }
    };
  }),
  withHooks({
    onInit(store) {
      const platformId = inject(PLATFORM_ID);
      effect(() => {
        if (isPlatformBrowser(platformId)) {
          const cart: Cart = {
            id: store.id?.() ?? 0,
            userId: store.userId(),
            products: store.products()
          };

          if (cart.products.length > 0) {
            sessionStorage.setItem('cart', JSON.stringify(cart));
          } else {
            sessionStorage.removeItem('cart');
          }
        }
      });
    }
  })
);

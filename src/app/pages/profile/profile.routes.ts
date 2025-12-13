import { Routes } from '@angular/router';
import { MyInfoComponent } from './my-info/my-info.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    { path: '', redirectTo: 'my-info', pathMatch: 'full' },
    { path: 'my-info', component: MyInfoComponent },
    { path: 'cart', component: CartComponent },
    { path: 'payment', component: PaymentComponent },
];

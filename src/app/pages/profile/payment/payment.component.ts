import { Component, inject } from '@angular/core';
import { PaymentResumeComponent } from '../components/payment-resume/payment-resume.component';
import { RouterLink } from '@angular/router';
import { CartStore } from '@app/core/stores/cart.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentResumeComponent, RouterLink, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  protected cart = inject(CartStore);

}

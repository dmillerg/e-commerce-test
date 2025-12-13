import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHighlightDirective } from '@app/core/directives/error-hightlight.directive';
import { MaxLengthDirective } from '@app/core/directives/max-length.directive';
import { MonthYearFormatterDirective } from '@app/core/directives/mont-year-formatter.directive';
import { NumberFormatterDirective } from '@app/core/directives/number-formatter.directive';
import { OnlyDigitDirective } from '@app/core/directives/only-digit.directive';
import { NotificationService } from '@app/core/services/notification.service';
import { CartStore } from '@app/core/stores/cart.store';
import { UserStore } from '@app/core/stores/user.store';

@Component({
  selector: 'app-payment-resume',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorHighlightDirective, NumberFormatterDirective, MonthYearFormatterDirective, MaxLengthDirective, OnlyDigitDirective],
  templateUrl: './payment-resume.component.html',
  styleUrl: './payment-resume.component.scss'
})
export class PaymentResumeComponent implements OnInit {

  protected loading: boolean = false;

  protected notificationService = inject(NotificationService);
  protected router = inject(Router);
  protected cartStore = inject(CartStore);
  protected userStore = inject(UserStore);

  private readonly fb = inject(FormBuilder);
  protected frm = this.fb.group({
    address: ['', Validators.required],
    number: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.min(100), Validators.minLength(3)]],
    exp: ['', Validators.required],
  });

  subtotal = this.cartStore?.getCart().products.reduce((acc, r) => acc + (r.price * r.quantity), 0) ?? 0;

  ngOnInit(): void {
    this.frm.patchValue({
      address: this.userStore.getUser()?.address
    })
  }

  protected iva() {
    return this.subtotal * 0.16;
  }

  protected total() {
    return this.subtotal + this.iva();
  }

  protected submit() {
    if (this.frm.invalid) return this.frm.markAllAsTouched();
    this.loading = true;
    setTimeout(() => {
      this.cartStore.clearCart();
      this.loading = false;
      this.notificationService.push('Pago Completado', 'Hemos verificado su pago y es momento de ponernos a trabajar, en unas horas su orden estará en la puerta de su casa.', 10000, 'SUCCESS');
      this.router.navigate(['profile/cart'])
    }, 3000);
  }
}

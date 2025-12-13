import { Component, inject, OnInit } from '@angular/core';
import { PaymentResumeComponent } from '../components/payment-resume/payment-resume.component';
import { RouterLink } from '@angular/router';
import { CartStore } from '@app/core/stores/cart.store';
import { CommonModule } from '@angular/common';
import { MetaDataService } from '@app/core/services/meta-data.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentResumeComponent, RouterLink, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  protected cart = inject(CartStore);
  private readonly metadataService = inject(MetaDataService);
  ngOnInit(): void {
    this.metadataService.init('payments')
  }
}

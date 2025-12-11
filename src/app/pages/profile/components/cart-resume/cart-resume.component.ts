import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-cart-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-resume.component.html',
  styleUrl: './cart-resume.component.scss'
})
export class CartResumeComponent {

  subtotal = model<number>(0)

  protected iva() {
    return this.subtotal() * 0.16;
  }

  protected total() {
    return this.subtotal() + this.iva();
  }
}

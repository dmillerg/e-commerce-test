import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { Product } from '@app/core/models/product';
import { ShortDescriptionPipe } from '@app/core/pipes/short-description.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  product = model<Product>();
}

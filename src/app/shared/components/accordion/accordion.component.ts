import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptionCheck } from '@app/core/models/option';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {

  categorys = model<OptionCheck[]>([])

  currentPrice = 0;
  minPrice = model<number>(0);
  maxPrice = model<number>(0);

  filter = model<{ categories: string[], currentPrice: number }>({ categories: [], currentPrice: 0 });

  id = model('');

  resetFilter() {
    this.categorys.update(arr =>
      arr.map(e => ({
        ...e,
        checked: false
      }))
    );
    this.currentPrice = 0;
    this.applyFilter();
  }

  applyFilter() {
    this.filter.set(
      {
        categories: this.categorys().filter(e => e.checked).map(e => e.name),
        currentPrice: this.currentPrice
      }
    )
  }

  openClose(id: string) {
    const event = document.getElementById(id)!;
    event.click();
  }
}

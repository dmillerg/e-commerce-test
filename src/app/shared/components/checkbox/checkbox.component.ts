import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptionCheck } from '@app/core/models/option';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  item = model<OptionCheck>();
  id = model('');
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '@app/core/models/option';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  @Input() options: Option[] = [];
  @Input() placeholder: string = 'Selecciona una opción';
  isOpen: boolean = false;
  @Output() select: EventEmitter<string> = new EventEmitter<string>();

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(event: Event): void {
    const option = (event.target as HTMLSelectElement).value;
    this.isOpen = false;
    this.select.emit(option);
  }
}

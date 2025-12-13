import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumberFormatter]',
  standalone: true
})
export class NumberFormatterDirective {
  private readonly maxLength = 16;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, ''); 

    if (value.length > this.maxLength) {
      value = value.substring(0, this.maxLength);
    }

    let formatted = '';
    if (value.length > 0) {
      formatted = value.substring(0, 4);
    }
    if (value.length > 4) {
      formatted += ' - ' + value.substring(4, 8);
    }
    if (value.length > 8) {
      formatted += ' - ' + value.substring(8, 12);
    }
    if (value.length > 11) {
      formatted += ' - ' + value.substring(12, 16);
    }

    input.value = formatted;
  }
}

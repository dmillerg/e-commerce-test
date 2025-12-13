import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMonthYearFormatter]',
  standalone: true
})
export class MonthYearFormatterDirective {
  private readonly maxLength = 4; 

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, ''); 

    if (value.length > this.maxLength) {
      value = value.substring(0, this.maxLength);
    }

    if (value.length >= 2) {
      let month = parseInt(value.substring(0, 2), 10);
      if (month < 1) {
        month = 1;
      } else if (month > 12) {
        month = 12;
      }
      value = month.toString().padStart(2, '0') + value.substring(2);
    }

    let formatted = '';
    if (value.length > 0) {
      formatted = value.substring(0, 2);
    }
    if (value.length > 2) {
      formatted += '/' + value.substring(2, 4);
    }

    input.value = formatted;
  }
}

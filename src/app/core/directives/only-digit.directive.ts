import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyDigit]',
  standalone: true
})
export class OnlyDigitDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    input.value = input.value.replace(/\D/g, ''); 
  }
}

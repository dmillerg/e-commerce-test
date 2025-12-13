import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMaxLength]',
  standalone: true
})
export class MaxLengthDirective {
  @Input('appMaxLength') maxLength: number = 10; 

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    let value = input.value;

    if (value.length > this.maxLength) {
      input.value = value.substring(0, this.maxLength);
    }
  }
}

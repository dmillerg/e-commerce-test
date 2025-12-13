import { Directive, ElementRef, Renderer2, DoCheck } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appErrorHighlight]',
  standalone: true
})
export class ErrorHighlightDirective implements DoCheck {
  private errorElement?: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {}

  ngDoCheck() {
    this.updateErrorState();
  }

  private updateErrorState() {
    const ctrl = this.control.control;
    if (!ctrl) return;

    const hasError = ctrl.invalid && (ctrl.touched || ctrl.dirty);

    if (hasError) {
      this.renderer.addClass(this.el.nativeElement, 'is-error');
      this.showError(ctrl.errors || {});
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-error');
      this.removeError();
    }
  }

  private showError(errors: Record<string, any>) {
    this.removeError();
    const firstKey = Object.keys(errors)[0];
    if (!firstKey) return;

    const defaultMessages: Record<string, string> = {
      required: 'Este campo es obligatorio',
      email: 'Formato de correo inválido',
      minlength: 'El valor es demasiado corto',
      maxlength: 'El valor es demasiado largo',
      pattern: 'Formato inválido',
    };

    const message = defaultMessages[firstKey] || 'Campo inválido';

    this.errorElement = this.renderer.createElement('small');
    this.renderer.addClass(this.errorElement, 'text-red-500');
    this.renderer.addClass(this.errorElement, 'text-xs');
    this.renderer.appendChild(this.errorElement, this.renderer.createText(message));
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorElement);
  }

  private removeError() {
    if (this.errorElement) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorElement);
      this.errorElement = undefined;
    }
  }
}

import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFallbackImagesTs]',
  standalone: true
})
export class FallbackImagesTsDirective {
  private readonly fallbackUrl: string = 'assets/img/fallback.jpg';

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError() {
    const element = this.el.nativeElement;
    element.src = this.fallbackUrl;
  }
}

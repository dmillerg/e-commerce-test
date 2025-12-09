import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected platformName= environment.platformName;
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }
}

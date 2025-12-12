import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { UserStore } from '@app/core/stores/user.store';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected userStore = inject(UserStore);
  protected platformName= environment.platformName;
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }
}

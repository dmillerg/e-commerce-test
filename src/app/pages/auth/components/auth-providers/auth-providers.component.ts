import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'app-auth-providers',
  standalone: true,
  imports: [],
  templateUrl: './auth-providers.component.html',
  styleUrl: './auth-providers.component.scss'
})
export class AuthProvidersComponent {

  private readonly router = inject(Router);


  protected handleAuth(provider: string) {

    const width = 600;
    const height = 600;
    const pageToken = environment.apikey;

    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authUrl = `https://ms.dveloxsoft.com/auth/${provider}?state=${pageToken}`;

    const popup = window.open(
      authUrl,
      'authPopup',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const backendOrigin = 'https://ms.dveloxsoft.com';

    const popupChecker = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(popupChecker);
      }
    }, 500);

    window.addEventListener('message', (event) => {
      if (event.origin !== backendOrigin) return;

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        sessionStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['products/catalog'])
      } catch (err) {
        console.error('Error parsing auth response:', err);
      }

      clearInterval(popupChecker);
      popup?.close();
    });

  }
}

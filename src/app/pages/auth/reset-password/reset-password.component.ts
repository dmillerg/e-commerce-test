import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHighlightDirective } from '@app/core/directives/error-hightlight.directive';
import { AuthService } from '@app/core/services/auth.service';
import { NotificationService } from '@app/core/services/notification.service';
import { matchPasswordValidator } from '@app/core/validators/match-password.validator';
import { take } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorHighlightDirective, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [AuthService]
})
export class ResetPasswordComponent {

  protected showPassword = false;
  protected showConfirm = false;
  protected loading: boolean = false;

  private readonly notificationService = inject(NotificationService);

  private fb = inject(FormBuilder);
  protected frm = this.fb.group({
    token: [],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirm: [null, [Validators.required, matchPasswordValidator]],
  });

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected submit() {
    if (this.frm.invalid) return this.frm.markAllAsTouched();
    this.loading = true;
    const token = this.activatedRoute.snapshot.params['token'];
    const data = this.frm.value;
    data.token = token;
    this.authService.changePasword(data as any).pipe(take(1)).subscribe({
      next: () => {
        this.loading = false;
        this.notificationService.push('Contraseña actualizada con éxito', 'Tu contraseña ha sido cambiada correctamente. Si no realizaste esta acción, por favor revisa tu cuenta de inmediato.', 5000, 'SUCCESS');
        setTimeout(() => {
          this.router.navigate(['auth/login'])
        }, 2000);
      }, complete: () => this.loading = false
    })
  }


}

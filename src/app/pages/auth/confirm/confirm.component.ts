import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHighlightDirective } from '@app/core/directives/error-hightlight.directive';
import { AuthService } from '@app/core/services/auth.service';
import { NotificationService } from '@app/core/services/notification.service';
import { UserService } from '@app/core/services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorHighlightDirective],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  providers: [AuthService, UserService]
})
export class ConfirmComponent {

  protected loadingReset: boolean = false;
  protected loadingActive: boolean = false;

  private fb = inject(FormBuilder);
  protected frm = this.fb.group({
    token: [null, Validators.required],
  });

  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);


  protected submit() {
    if (this.frm.invalid) return this.frm.markAllAsTouched();
    this.loadingActive = true;
    this.userService.activateUser(this.frm.value.token!).pipe(take(1)).subscribe({
      next: () => {
        this.loadingActive = false;
        this.notificationService.push('Cuenta activa', 'Se ha confirmado su correo satisfactoriamente ahora solo debe iniciar sesión', 5000, 'SUCCESS')
        setTimeout(() => {
          this.router.navigate(['auth/login'])
        }, 2000)
      }, complete: () => this.loadingActive = false
    })
  }

  protected sendConfirmationEmail() {
    this.loadingReset = true;
    const email = this.activatedRoute.snapshot.queryParams['email'];
    this.authService.sendConfirmationToken(email).pipe(take(1)).subscribe({
      next: () => {
        this.loadingReset = false;
        this.notificationService.push('Envio exitoso', 'La confirmación de su cuenta ha sido reenviada. Por favor, verifique su correo electrónico para continuar con el proceso.', 5000, 'SUCCESS')
      }, complete: () => this.loadingReset = false
    })
  }
}

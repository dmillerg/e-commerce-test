import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthProvidersComponent } from '../components/auth-providers/auth-providers.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpressionValidate } from '@app/core/consts/expresion-validate';
import { matchPasswordValidator } from '@app/core/validators/match-password.validator';
import { ErrorHighlightDirective } from '@app/core/directives/error-hightlight.directive';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { NotificationService } from '@app/core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    AuthProvidersComponent,
    ReactiveFormsModule,
    ErrorHighlightDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AuthService]
})
export class RegisterComponent {
  protected showPassword = false;
  protected showConfirm = false;

  private readonly notificationService = inject(NotificationService);

  protected loading: boolean = false;

  private fb = inject(FormBuilder);
  protected frm = this.fb.group({
    email: [null, [Validators.required, Validators.pattern(ExpressionValidate.email)]],
    name: [null, [Validators.required]],
    avatar: this.fb.control<string | null>(null),
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirm: [null, [Validators.required, matchPasswordValidator]],
  });


  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected avatarSrc: string = '';

  protected submit() {
    if (this.frm.invalid) {
      this.frm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService.register(this.frm.value as any).pipe(take(1)).subscribe({
      next: () => {
        this.loading = false;
        this.notificationService.push('Cuenta activa', 'Se ha confirmado su correo satisfactoriamente ahora solo debe iniciar sesión', 5000, 'SUCCESS');
        setTimeout(() => {
          this.router.navigate([`auth/confirm/${this.frm.value.email}`]);
        }, 2000);
      }, complete: () => this.loading = false
    });
  }

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      console.error('Solo se permiten imágenes');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.avatarSrc = base64;

      this.frm.get('avatar')?.setValue(base64);
    };
    reader.readAsDataURL(file);
  }

}

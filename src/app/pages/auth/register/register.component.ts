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

  private fb = inject(FormBuilder);
  protected frm = this.fb.group({
  email: [null, [Validators.required, Validators.pattern(ExpressionValidate.email)]],
  name: [null, [Validators.required]],
  avatar: this.fb.control<File | null>(null), // 👈 acepta File o null
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

    const formData = new FormData();

    formData.append('email', this.frm.get('email')?.value ?? '');
    formData.append('name', this.frm.get('name')?.value ?? '');
    formData.append('password', this.frm.get('password')?.value ?? '');
    formData.append('confirm', this.frm.get('confirm')?.value ?? '');

    const avatarControl = this.frm.get('avatar');
    const file: File | null = avatarControl!.value;
    if (file instanceof File) {
      formData.append('avatar', file);
    }

    this.authService.register(formData).pipe(take(1)).subscribe({
      next: () => {
        this.router.navigate(['products/catalog']);
      }
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

    this.frm.get('avatar')?.setValue(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

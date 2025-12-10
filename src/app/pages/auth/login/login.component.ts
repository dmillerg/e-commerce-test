import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthProvidersComponent } from '../components/auth-providers/auth-providers.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpressionValidate } from '@app/core/consts/expresion-validate';
import { ErrorHighlightDirective } from '@app/core/directives/error-hightlight.directive';
import { AuthService } from '@app/core/services/auth.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthProvidersComponent, ReactiveFormsModule, ErrorHighlightDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService]
})
export class LoginComponent {

  protected showPassword: boolean = false;
  private fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected frm = this.fb.group({
    email: [null, [Validators.required, Validators.pattern(ExpressionValidate.email)]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  protected submit() {
    if (this.frm.invalid) return this.frm.markAllAsTouched();

    this.authService.login(this.frm.value as any).pipe(take(1)).subscribe({
      next: () => {
        this.router.navigate(['products/catalog'])
      }
    })
  }
}

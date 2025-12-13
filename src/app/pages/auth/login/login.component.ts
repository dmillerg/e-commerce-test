import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthProvidersComponent } from '../components/auth-providers/auth-providers.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpressionValidate } from '@app/core/consts/expresion-validate';
import { ErrorHighlightDirective } from '@app/core/directives/error-hightlight.directive';
import { AuthService } from '@app/core/services/auth.service';
import { switchMap, take } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '@app/core/services/notification.service';
import { UserService } from '@app/core/services/user.service';
import { UserStore } from '@app/core/stores/user.store';
import { MetaDataService } from '@app/core/services/meta-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthProvidersComponent, ReactiveFormsModule, ErrorHighlightDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, UserService]
})
export class LoginComponent implements OnInit{

  protected loadingLogin: boolean = false;
  protected loadingForgot: boolean = false;

  protected showPassword: boolean = false;
  private fb = inject(FormBuilder);
  private readonly metadataService = inject(MetaDataService);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);
  protected frm = this.fb.group({
    email: [null, [Validators.required, Validators.pattern(ExpressionValidate.email)]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });
  private readonly notificationService = inject(NotificationService);


  ngOnInit(): void {
    this.metadataService.init('login');
  }

  protected submit() {
    if (this.frm.invalid) return this.frm.markAllAsTouched();
    this.loadingLogin = true;

    this.authService.login(this.frm.value as any).pipe(
      take(1),
      switchMap((response) => {
        sessionStorage.setItem('auth', JSON.stringify(response));
        return this.userService.getUserData();
      })
    ).subscribe({
      next: (user) => {
        this.loadingLogin = false;
        this.userStore.setUser(user);
        this.router.navigate(['products/catalog']);
      },
      complete: () => this.loadingLogin = false
    });
  }

  protected forgetPassword() {
    if (this.frm.get('email')?.invalid) return this.frm.get('email')?.markAllAsTouched();
    this.loadingForgot = true;
    const { email } = this.frm.value
    this.authService.getTokenChangePassword(email!).pipe(take(1)).subscribe({
      next: () => {
        this.loadingForgot = false;
        this.notificationService.push('Se ha enviado el correo', 'El correo de restablecimiento de su contraseña se ha enviado por favor revise su bandeja de entrada.', 5000, 'SUCCESS')
      }, complete: () => this.loadingForgot = false
    })
  }
}

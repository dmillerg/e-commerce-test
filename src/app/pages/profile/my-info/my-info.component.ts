import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorHighlightDirective } from '@app/core/directives/error-hightlight.directive';
import { FallbackImagesTsDirective } from '@app/core/directives/fallback-images.ts.directive';
import { TooltipDirective } from '@app/core/directives/tootltip.directive';
import { User } from '@app/core/models/user';
import { NotificationService } from '@app/core/services/notification.service';
import { UserService } from '@app/core/services/user.service';
import { UserStore } from '@app/core/stores/user.store';
import { matchPasswordValidator } from '@app/core/validators/match-password.validator';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [TooltipDirective, ReactiveFormsModule, ErrorHighlightDirective, FallbackImagesTsDirective],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.scss',
  providers: [UserService]
})
export class MyInfoComponent implements OnInit {


  protected userStore = inject(UserStore);
  protected userService = inject(UserService);
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);

  protected loadingEdit: boolean = false;

  protected showPassword: boolean = false;
  protected showConfirm: boolean = false;

  protected avatarSrc: string | null = null;

  protected frm = this.fb.group({
    avatar: [''],
    name: ['', Validators.required],
    email: [{ value: '', disabled: true }, Validators.required],
    address: [''],
    password: ['', [Validators.minLength(8)]],
    confirm: ['', [matchPasswordValidator]]
  });

  ngOnInit(): void {
    this.avatarSrc = this.userStore.getUser()?.avatar ?? '';
    this.frm.patchValue({
      avatar: this.userStore.getUser()?.avatar,
      name: this.userStore.getUser()?.name,
      email: this.userStore.getUser()?.email,
      address: this.userStore.getUser()?.address,
    })
  }

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.notificationService.push('Formato incorrecto', 'Solo se permiten imágenes', 8000, 'ERROR');
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


  protected submit() {
    if (this.frm.invalid) return this.frm.markAllAsTouched();
    this.loadingEdit = true;

    const frmData = this.frm.getRawValue();
    const user: User = {
      ...this.userStore.getUser()!,
      avatar: frmData.avatar!,
      name: frmData.name!,
      email: frmData.email!,
      address: frmData.address!,
      password: frmData.password ?? undefined
    };

    this.userService.update(user).pipe(
      take(1),
      switchMap(() => this.userService.getUserData().pipe(take(1)))
    ).subscribe({
      next: (userData) => {
        this.userStore.setUser(userData);
        this.loadingEdit = false;
        this.frm.get('password')?.setValue(null);
        this.frm.get('confirm')?.setValue(null);
        this.frm.get('password')?.markAsUntouched();
        this.frm.get('confirm')?.markAsUntouched();
        this.frm.updateValueAndValidity();
        this.notificationService.push('Datos guardados', 'Se ha modificado satisfactoriamente su información', 5000, 'SUCCESS');
      },
      complete: () => this.loadingEdit = false
    });
  }

  protected removeImg() {
    this.frm.get('avatar')?.setValue(null);
    this.avatarSrc = null
  }
}

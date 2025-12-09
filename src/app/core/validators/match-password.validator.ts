import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.root.get('password');
  const confirmPassword = control.value;

  if (password && confirmPassword !== password.value) {
    return { passwordMismatch: true };
  }

  return null;
}

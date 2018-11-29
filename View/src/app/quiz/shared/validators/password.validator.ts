import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {AbstractControl} from '@angular/forms';

export function passwordValidator: ValidatorFn = 
(control: FormGroup):ValidationErrors | null => {
    const password= control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
    return newPassword && newPasswordCheck && 
    newPassword.value === newPasswordCheck.value ? 
    { 'identityRevealed': true } : null;
    };
  }

  /*export const PasswordValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const newPassword= control.get('newPassword');
    const newPasswordCheck = control.get('newPasswordCheck');
  console.log(control.value);
    return newPassword && newPasswordCheck && newPassword.value === newPasswordCheck.value ? { 'identityRevealed': true } : null;
  };*/

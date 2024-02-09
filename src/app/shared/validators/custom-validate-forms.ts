import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidatedForms {
  static validatePassword(control: AbstractControl): ValidationErrors | null {
    const { value } = control;
    const checkNumber = /[0-9]/.test(value);
    const checkCapitalLetter = /[A-Z]/.test(value);
    const checkLowercaseLetter = /[a-z]/.test(value);
    const checkSpecialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/.test(value);
    const isLengthValid = value ? (value.length > 7) : false;

    const passwordValid = checkNumber && checkCapitalLetter
    && checkLowercaseLetter && isLengthValid && checkSpecialChars;

    if (!passwordValid) {
      return { invalidPassword: true };
    }
    return null;
  }

  static validateDate(control: AbstractControl): ValidationErrors | null {
    const { value } = control;
    const dateNow = new Date();
    const createDate = new Date(value);

    if (createDate > dateNow) {
      return { invalidDate: true };
    }

    return null;
  }
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { startDate } = control.value;
    const { endDate } = control.value;

    const isValid = endDate >= startDate;

    return isValid ? null : { isDateInvalid: true };
  };
}

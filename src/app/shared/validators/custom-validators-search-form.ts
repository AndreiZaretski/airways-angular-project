import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { startDate } = control.value;
    const { endDate } = control.value;

    const isValid = endDate >= startDate;

    return isValid ? null : { isDateInvalid: true };
  };
}

export function createLocationsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { fromLocation } = control.value;
    const { toLocation } = control.value;

    const isValid = fromLocation ? fromLocation !== toLocation : true;

    return isValid ? null : { sameLocations: true };
  };
}

import {
  AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    if (control && control.touched) {
      return (form?.value.route.fromLocation && form?.value.route.toLocation)
        ? (form?.value.route.fromLocation === form?.value.route.toLocation)
        : !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
    if ((control && isSubmitted) || (control && control.touched && control.invalid)) {
      return control.hasError('required');
    }
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

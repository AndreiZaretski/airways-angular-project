import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidatedForms } from 'src/app/shared/validators/custom-validate-forms';
import { country } from 'src/app/shared/data/country';

interface Country {
  country: string;
  calling_code: number
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  countries: Country[] = country;

  hide = true;

  errorMessageProvatePolice = '';

  constructor(
    private dialogRef: MatDialogRef<SignupComponent>,
  ) {
  }

  formSignup = new FormGroup({
    userName: new FormControl<string>(
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ),
    password: new FormControl<string>('', [
      Validators.required,
      ValidatedForms.validatePassword,
    ]),

    firstName: new FormControl<string>(
      '',
      [
        Validators.required,
        Validators.pattern('[A-Za-zА-Яа-яЁё]+$'),
      ],
    ),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('[A-Za-zА-Яа-яЁё]+$'),
    ]),

    birthDay: new FormControl<string>('', [Validators.required,
      ValidatedForms.validateDate]),

    gender: new FormControl<string>('male', [Validators.required]),

    countryCode: new FormControl<number>(this.countries[0].calling_code, [Validators.required]),

    phoneNumber: new FormControl<string>('', [Validators.required,
      Validators.pattern('[0-9]{5,13}'),
    ]),

    citizenship: new FormControl<string>('', []),

    termsUse: new FormControl<string>('', [Validators.required,
    ]),
  });

  getErrorMessageEmail() {
    if (this.formSignup.controls.userName.hasError('required')) {
      return 'Please enter a login email';
    }
    return this.formSignup.controls.userName.hasError('pattern') ? 'Enter a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.formSignup.controls.password.hasError('required')) {
      return 'Please enter a password';
    }
    return this.formSignup.controls.password.hasError('invalidPassword')
      ? 'Your password isn\'t strong enough. The password must contain at least 8 characters,a mixture of both uppercase and lowercase letters, a mixture of letters and numbers and inclusion of at least one special character, e.g., ! @ # ? [] + = ( )' : '';
  }

  getErroMessage() {
    if (this.formSignup.controls.termsUse.invalid) {
      this.errorMessageProvatePolice = ' Please accept the user agreement and privacy policy';
    } else { this.errorMessageProvatePolice = ''; }
  }

  onLogin() {
    console.log(this.formSignup.valid);
    if (this.formSignup.valid) {
      this.dialogRef.close();
      console.log(this.formSignup.value);
    }
  }
}

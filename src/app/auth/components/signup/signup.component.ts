import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidatedForms } from 'src/app/shared/validators/custom-validate-forms';
import { country } from 'src/app/shared/data/country';
// import { catchError } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

interface Country {
  country: string;
  calling_code: number
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  countries: Country[] = country;

  hide = true;

  errorMessageProvatePolice = '';

  message = '';

  loading = false;

  subscription: Subscription | undefined;

  constructor(
    private dialogRef: MatDialogRef<SignupComponent>,
    private authService: AuthService,
    private formBuilder: FormBuilder,

  ) {}

  formSignup!: FormGroup;

  ngOnInit(): void {
    this.formSignup = this.formBuilder.group({
      email: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required,
        ValidatedForms.validatePassword]],

      firstName: ['', [Validators.required,
        Validators.pattern('[A-Za-zА-Яа-яЁё]+$')]],
      lastName: ['', [Validators.required,
        Validators.pattern('[A-Za-zА-Яа-яЁё]+$')]],

      birthDay: ['', [Validators.required,
        ValidatedForms.validateDate]],

      gender: ['male', [Validators.required]],

      countryCode: [this.countries[0].calling_code, [Validators.required]],

      phoneNumber: ['', [Validators.required,
        Validators.pattern('[0-9]{5,13}')]],

      citizenship: ['', []],

      termsUse: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getErrorMessageEmail() {
    if (this.formSignup.controls['email'].hasError('required')) {
      return 'Please enter a login email';
    }
    return this.formSignup.controls['email'].hasError('pattern') ? 'Enter a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.formSignup.controls['password'].hasError('required')) {
      return 'Please enter a password';
    }
    return this.formSignup.controls['password'].hasError('invalidPassword')
      ? 'Your password isn\'t strong enough. The password must contain at least 8 characters,a mixture of both uppercase and lowercase letters, a mixture of letters and numbers and inclusion of at least one special character, e.g., ! @ # ? [] + = ( )' : '';
  }

  getErroMessage() {
    if (this.formSignup.controls['termsUse'].invalid) {
      this.errorMessageProvatePolice = ' Please accept the user agreement and privacy policy';
    } else { this.errorMessageProvatePolice = ''; }
  }

  onLogin() {
    console.log(this.formSignup.valid);
    if (this.formSignup.valid) {
      this.loading = true;
      this.subscription = this.authService.registration(this.formSignup.value)
        // .pipe(catchError(() => this.message = 'This email is already exist'))
        .subscribe(
          () => {
            this.dialogRef.close();
            console.log(this.authService.user$);
          },
          () => {
            (this.message = 'This email is already exist');
            this.loading = false;
          },
          () => null,
        );
      // (res) => console.log(res),

      // );
      // this.dialogRef.close();
      // console.log(this.formSignup.value);
    }
  }
}

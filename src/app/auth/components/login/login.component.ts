import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
  ) {
  }

  public formLogin = new FormGroup({
    userName: new FormControl<string>(
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ),
    password: new FormControl<string>('', [
      Validators.required,
    ]),
  });

  getErrorMessageEmail() {
    if (this.formLogin.controls.userName.hasError('required')) {
      return 'Please enter a login email';
    }
    return this.formLogin.controls.userName.hasError('pattern') ? 'Enter a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.formLogin.controls.password.hasError('required')) {
      return 'Please enter a password';
    }
    return '';
  }

  onLogin() {
    if (this.formLogin.valid) {
      this.dialogRef.close();
    }
  }
}

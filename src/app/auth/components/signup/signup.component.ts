import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../pages/modal/modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  hide = true;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    // private closeModal: CloseModalService,
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
      // ValidatedForms.validatePassword,
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
    return this.formLogin.controls.password.hasError('invalidPassword')
      ? 'Your password isn\'t strong enough. The password must contain at least 8 characters,a mixture of both uppercase and lowercase letters, a mixture of letters and numbers and inclusion of at least one special character, e.g., ! @ # ? [] + = ( )' : '';
  }

  onLogin() {
    if (this.formLogin.valid) {
      // this.closeModal.closeModal();
    }
  }
}

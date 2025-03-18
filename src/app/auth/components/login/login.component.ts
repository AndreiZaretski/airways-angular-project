import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { getRequestUser } from 'src/app/redux/actions/state.actions';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../shared/models/interface-users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;

  message = '';

  loading = false;

  subscription: Subscription | undefined;

  formLogin!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl<string>(
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
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getErrorMessageEmail() {
    if (this.formLogin.controls['email'].hasError('required')) {
      return 'Please enter a login email';
    }
    return this.formLogin.controls['email'].hasError('pattern') ? 'Enter a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.formLogin.controls['password'].hasError('required')) {
      return 'Please enter a password';
    }
    return '';
  }

  onLogin() {
    if (this.formLogin.valid) {
      this.loading = true;
      this.subscription = this.authService.login(this.formLogin.value).pipe(
        catchError(() => this.message = 'Incorrect email or password'),
      ).subscribe((res) => {
        if ((res as AuthResponse).user) {
          this.dialogRef.close();
          const result = (res as AuthResponse).user;
          this.store.dispatch(getRequestUser({ currentUser: result }));
        }
        this.loading = false;
      });
    }
  }
}

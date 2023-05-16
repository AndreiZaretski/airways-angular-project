import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EMPTY, Observable, catchError, tap,
} from 'rxjs';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';
import {
  AuthLogin, AuthRegistration, AuthResponse, AuthResponseLight, IUserSettings,
} from 'src/app/shared/models/interface-users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // currentUser$ = new BehaviorSubject<AuthResponseLight | null>(null);

  constructor(private http: HttpClient) { }

  login(user: AuthLogin): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('login', user).pipe(
      tap((res) => {
        this.writeLocalStorage(res);
      }),
    );
  }

  registration(user: AuthRegistration): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('register', user).pipe(
      tap((res) => {
        this.writeLocalStorage(res);
      }),
    );
  }

  writeLocalStorage(res: AuthResponse) {
    if (res.accessToken) {
      localStorage.setItem('auth-token', res.accessToken);
      localStorage.setItem('auth-id', String(res.user.id));
    }
  }

  getUser() {
    if (localStorage.getItem('auth-id') && localStorage.getItem('auth-token')) {
      return this.http.get<AuthResponseLight>(`600/users/${localStorage.getItem('auth-id')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      })
        .pipe(
          catchError(() => {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('auth-id');
            return EMPTY;
          }),
        );
    }
    return new Observable<AuthResponseLight>();
  }

  checkUser() {
    return !!localStorage.getItem('auth-token');
  }

  updateUserData(userOrder: IBookingPage[]) {
    if (localStorage.getItem('auth-id')) {
      const requestBody = { orders: userOrder };
      return this.http.patch<AuthResponseLight>(`users/${localStorage.getItem('auth-id')}`, requestBody).pipe(
        catchError(() => EMPTY),
      );
      // .pipe(
      //   tap((data) => console.log('response', data)), // log the response data
      //   catchError((error) => { // catch and log any errors
      //     console.error('error', error);
      //     return throwError(error);
      //   }),
      // );
    }
    // return new Observable<IBookingPage[]>();
    // <AuthResponseLight>
    return null;
  }

  updateUserSettings(userSettings: IUserSettings) {
    if (localStorage.getItem('auth-id')) {
      return this.http.patch<AuthResponseLight>(`users/${localStorage.getItem('auth-id')}`, { userSettings }).pipe(
        catchError(() => EMPTY),
      );
    }
    return null;
  }
}

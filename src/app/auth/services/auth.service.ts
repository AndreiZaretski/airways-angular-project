import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EMPTY,
  Observable, catchError, tap,
} from 'rxjs';
import { AuthLogin, AuthRegistration, AuthResponse } from 'src/app/core/models/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new Observable<AuthResponse>();

  constructor(private http: HttpClient) { }

  login(user: AuthLogin): Observable<AuthResponse> {
    return this.user$ = this.http.post<AuthResponse>('http://localhost:3000/login', user).pipe(
      tap((res) => {
        this.writeLocalStorage(res);
      }),
    );
  }

  registration(user: AuthRegistration): Observable<AuthResponse> {
    return this.user$ = this.http.post<AuthResponse>('http://localhost:3000/register', user).pipe(
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
      return this.http.get<AuthResponse>(`http://localhost:3000/600/users/${localStorage.getItem('auth-id')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      }).pipe(
        catchError(() => EMPTY),
      );
    }
    if (!localStorage.getItem('auth-id') && !localStorage.getItem('auth-token')) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-token');

      // eslint-disable-next-line @typescript-eslint/ban-types
      return new Observable<{ }>();
    }
    // null;
    // new Observable<null>();
    // eslint-disable-next-line @typescript-eslint/ban-types
    return new Observable<{ }>();
  }
}

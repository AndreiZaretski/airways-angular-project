import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EMPTY, Observable, catchError, tap,
} from 'rxjs';
import {
  AuthLogin, AuthRegistration, AuthResponse, AuthResponseLight,
} from 'src/app/core/models/interface';

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
          catchError(() => EMPTY),
        );
    }
    return new Observable<AuthResponseLight>();
  }
}

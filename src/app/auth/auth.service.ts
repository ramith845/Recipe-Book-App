import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from './user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAKwWFqxHL_z6V9HBe19MdLfhc-XywR-4',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticationHandler(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAKwWFqxHL_z6V9HBe19MdLfhc-XywR-4',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticationHandler(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoSignin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoSignout(expirationDuration);
    }
  }

  signout() {
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignout(expirationDuration: number) {
    console.log(`session expires in: ${ (expirationDuration / 60000).toFixed(2) } mins`);

    this.tokenExpirationTimer = setTimeout(() => {
      this.signout();
    }, expirationDuration);
  }

  authenticationHandler(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoSignout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    let errormsg = 'There was an error';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errormsg);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errormsg = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errormsg = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errormsg = 'This password is not correct';
        break;
      case 'USER_DISABLED':
        errormsg = 'The user account has been disabled by an administrator';
        break;
    }
    return throwError(() => errormsg);
  }
}

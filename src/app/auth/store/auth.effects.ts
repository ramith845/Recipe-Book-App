import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  // Moving login code for making http req from auth service
  // Creating a side effect to the login action

  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START), //Checking for type of action from the this.authLogin.actions stream
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              });
            }),
            catchError((errorResponse) => {
              let errormsg = 'There was an error';
              if (!errorResponse.error || !errorResponse.error.error) {
                return of(new AuthActions.LoginFail(errormsg));
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
                  errormsg =
                    'The user account has been disabled by an administrator';
                  break;
                default:
                  const message = errorResponse.error.error.message;
                  let pattern = /^[A-Z_]+\s*:\s*(.*)$/;
                  const match = message.match(pattern);
                  errormsg = match ? match[1] : errormsg;
                  break;
              }
              return of(new AuthActions.LoginFail(errormsg));
            })
          );
      })
    );
  });

  authSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
  // $ is used in front of any observable when using reactive framework like rxjs or ngrx
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}

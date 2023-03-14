import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATION_SUCCESS = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATION_FAIL = '[Auth] Login Fail';
export const SIGN_UP_START = '[Auth] Sign Up Start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const RESET_ERROR = '[Auth] Reset Error';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean
    }
  ) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATION_FAIL;
  constructor(public payload: string) {}
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class ResetError implements Action {
  readonly type = RESET_ERROR;
}

export type AuthActions =
  | LoginStart
  | Logout
  | AuthenticationSuccess
  | AuthenticationFail
  | SignUpStart
  | AutoLogin
  | ResetError;

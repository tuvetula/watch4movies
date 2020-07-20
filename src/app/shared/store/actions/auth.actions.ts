import { Action } from '@ngrx/store';
import {
  UserSignup,
  CredentialModel,
  UserFirestoreModel,
} from '../../models/user.model';

export const TRY_SIGNUP = '[ user ] try signup';
export const SIGNUP_SUCCESS = '[ user ] signup success';
export const SIGNUP_ERROR = '[ user ] signup error';
export const TRY_SIGNIN = '[ user ] try signin';
export const SIGNIN_SUCCESS = '[ user ] signin success';
export const SIGNIN_ERROR = '[ user ] signin error';
export const SIGNIN_RESET_ERROR_SUCCESS = '[ user ] signin reset error success';
export const LOGOUT = '[ user ] logout';
export const TRY_FETCH_CURRENT_USER = '[ user ] try fetch current user';
export const SET_CURRENT_USER = '[ user ] set current user';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: UserSignup) {}
}
export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public payload: string) {}
}
export class SignupError implements Action {
  readonly type = SIGNUP_ERROR;
  constructor(public payload: string) {}
}
export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: CredentialModel) {}
}
export class SigninSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
  constructor(public payload: string) {}
}
export class SigninError implements Action {
  readonly type = SIGNIN_ERROR;
  constructor(public payload: string) {}
}
export class SigninResetErrorSuccess implements Action {
  readonly type = SIGNIN_RESET_ERROR_SUCCESS;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}
export class TryFetchCurrentUser implements Action {
  readonly type = TRY_FETCH_CURRENT_USER;
}
export class SetCurrentUser implements Action {
  readonly type = SET_CURRENT_USER;
  constructor(public payload: UserFirestoreModel) {}
}

export type AuthActions =
  | TrySignup
  | SignupSuccess
  | SignupError
  | TrySignin
  | SigninSuccess
  | SigninError
  | SigninResetErrorSuccess
  | Logout
  | TryFetchCurrentUser
  | SetCurrentUser;

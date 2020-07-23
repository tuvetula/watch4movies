import { Action } from '@ngrx/store';
import {
  UserSignup,
  CredentialModel,
  UserFirestoreModel,
} from '../../models/user.model';
import { FirebaseErrorModel } from '../../models/firebase.models';

export const TRY_SIGNUP = '[ user ] try signup';
export const SIGNUP_SUCCESS = '[ user ] signup success';
export const SIGNUP_ERROR = '[ user ] signup error';

export const TRY_UPDATE_AUTH_PROFILE = '[ user ] try update auth profile';
export const UPDATE_AUTH_PROFILE_SIGNUP_SUCCESS = '[ user ] update auth profile signup success';
export const UPDATE_AUTH_PROFILE_SUCCESS = '[ user ] update auth profile success';
export const UPDATE_AUTH_PROFILE_ERROR = '[ user ] update auth profile error';

export const TRY_SEND_VERIFICATION_EMAIL = '[ user ] try send verification email';
export const SEND_VERIFICATION_EMAIL_SUCCESS = '[ user ] send verification email success';
export const SEND_VERIFICATION_EMAIL_ERROR = '[ user ] send verification email error';

export const TRY_SIGNOUT = '[ user ] try signout';
export const SIGNOUT_SUCCESS = '[ user ] signout success';
export const SIGNOUT_ERROR = '[ user ] signout error';

export const TRY_SET_USER_FIRESTORE = '[ user ] try set user firestore';
export const TRY_SIGNIN = '[ user ] try signin';
export const SIGNIN_SUCCESS = '[ user ] signin success';
export const SIGNIN_ERROR = '[ user ] signin error';
export const SIGNIN_RESET_ERROR_SUCCESS = '[ user ] signin reset error success';



export const TRY_FETCH_CURRENT_USER = '[ user ] try fetch current user';
export const SET_CURRENT_USER = '[ user ] set current user';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: UserSignup) {}
}
export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(
    public payload: string
    ) {}
}
export class SignupError implements Action {
  readonly type = SIGNUP_ERROR;
  constructor(public payload: FirebaseErrorModel) {}
}

export class TryUpdateAuthProfile implements Action {
  readonly type = TRY_UPDATE_AUTH_PROFILE;
}
export class UpdateAuthProfileSignupSuccess implements Action {
  readonly type = UPDATE_AUTH_PROFILE_SIGNUP_SUCCESS;
}
export class UpdateAuthProfileSuccess implements Action {
  readonly type = UPDATE_AUTH_PROFILE_SUCCESS;
}
export class UpdateAuthProfilError implements Action {
  readonly type = UPDATE_AUTH_PROFILE_ERROR;
  constructor(public payload: FirebaseErrorModel) {}
}

export class TrySendVerificationEmail implements Action {
  readonly type = TRY_SEND_VERIFICATION_EMAIL;
}
export class SendVerificationEmailSuccess implements Action {
  readonly type = SEND_VERIFICATION_EMAIL_SUCCESS;
  constructor(public payload: string){}
}
export class SendVerificationEmailError implements Action {
  readonly type = SEND_VERIFICATION_EMAIL_ERROR;
  constructor(public payload: FirebaseErrorModel){}
}

export class TrySignout implements Action {
  readonly type = TRY_SIGNOUT;
}
export class SignoutSuccess implements Action {
  readonly type = SIGNOUT_SUCCESS;
}
export class SignoutError implements Action {
  readonly type = SIGNOUT_ERROR;
  constructor(public payload: FirebaseErrorModel){}
}


export class trySetUserFirestore implements Action {
  readonly type = TRY_SET_USER_FIRESTORE
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
  constructor(public payload: any) {}
}
export class SigninResetErrorSuccess implements Action {
  readonly type = SIGNIN_RESET_ERROR_SUCCESS;
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
  | TryUpdateAuthProfile
  | UpdateAuthProfileSignupSuccess
  | UpdateAuthProfileSuccess
  | UpdateAuthProfilError
  | TrySendVerificationEmail
  | SendVerificationEmailSuccess
  | SendVerificationEmailError
  | TrySignout
  | SignoutSuccess
  | SignoutError
  | TrySignin
  | SigninSuccess
  | SigninError
  | SigninResetErrorSuccess
  | TryFetchCurrentUser
  | SetCurrentUser;

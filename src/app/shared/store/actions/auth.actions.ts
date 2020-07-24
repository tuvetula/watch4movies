import { Action } from '@ngrx/store';
import {
  UserSignup,
  CredentialModel,
  UserFirestoreModel,
  UserFireAuth,
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

export const TRY_SIGNOUT_AFTER_SIGNUP = '[ user ] try signout after signup';
export const TRY_SIGNOUT = '[ user ] try signout';
export const SIGNOUT_AFTER_SIGNUP_SUCCESS = '[ user ] signout after signup success';
export const SIGNOUT_SUCCESS = '[ user ] signout success';
export const SIGNOUT_ERROR = '[ user ] signout error';

export const TRY_SIGNIN = '[ user ] try signin';
export const SIGNIN_SUCCESS = '[ user ] signin success';
export const SIGNIN_ERROR = '[ user ] signin error';
export const SIGNIN_WITH_EMAIL_NON_VERIFIED = '[ user ] signin with email non verified';

export const TRY_FETCH_FIRESTORE_CURRENT_USER = '[ user ] try fetch firestore current user';
export const FETCH_FIRESTORE_CURRENT_USER_SUCCESS = '[ user ] fetch firestore current user success';
export const FETCH_FIRESTORE_CURRENT_USER_ERROR = '[ user ] fetch firestore user error';

export const TRY_SET_FIRESTORE_CURRENT_USER = '[ user ] try set firestore current user';
export const SET_FIRESTORE_CURRENT_USER_SUCCESS = '[ user ] set firestore current user success';
export const SET_FIRESTORE_CURRENT_USER_ERROR = '[ user ] set firestore current user error';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: UserSignup) {}
}
export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(
    public payload: UserFireAuth) {}
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
export class UpdateAuthProfileError implements Action {
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

export class TrySignoutAfterSignup implements Action {
  readonly type = TRY_SIGNOUT_AFTER_SIGNUP;
}
export class TrySignout implements Action {
  readonly type = TRY_SIGNOUT;
}
export class SignoutAfterSignupSuccess implements Action {
  readonly type = SIGNOUT_AFTER_SIGNUP_SUCCESS;
}
export class SignoutSuccess implements Action {
  readonly type = SIGNOUT_SUCCESS;
  constructor(public payload: string){}
}
export class SignoutError implements Action {
  readonly type = SIGNOUT_ERROR;
  constructor(public payload: FirebaseErrorModel){}
}

//-------------------------------------------------
//----------------------SIGNIN---------------------
//-------------------------------------------------

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: CredentialModel) {}
}
export class SigninSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
  constructor(public payload:{
    user: UserFireAuth,
    success: string
  }) {}
}
export class SigninError implements Action {
  readonly type = SIGNIN_ERROR;
  constructor(public payload: FirebaseErrorModel) {}
}
export class SigninWithEmailNonVerified implements Action {
  readonly type = SIGNIN_WITH_EMAIL_NON_VERIFIED;
  constructor(public payload: FirebaseErrorModel){}
}

export class TryFetchFirestoreCurrentUser implements Action {
  readonly type = TRY_FETCH_FIRESTORE_CURRENT_USER;
}
export class FetchFirestoreCurrentUserSuccess implements Action {
  readonly type = FETCH_FIRESTORE_CURRENT_USER_SUCCESS;
  constructor(public payload: UserFirestoreModel){}
}
export class FetchFirestoreCurrentUserError implements Action {
  readonly type = FETCH_FIRESTORE_CURRENT_USER_ERROR;
}

export class TrySetFirestoreCurrentUser implements Action {
  readonly type = TRY_SET_FIRESTORE_CURRENT_USER;
}
export class SetFirestoreCurrentUserSuccess implements Action {
  readonly type = SET_FIRESTORE_CURRENT_USER_SUCCESS;
}
export class SetFirestoreCurrentUserError implements Action {
  readonly type = SET_FIRESTORE_CURRENT_USER_ERROR;
  constructor(public payload: UserFirestoreModel) {}
}

export type AuthActions =
  | TrySignup
  | SignupSuccess
  | SignupError
  | TryUpdateAuthProfile
  | UpdateAuthProfileSuccess
  | UpdateAuthProfileError
  | TrySendVerificationEmail
  | SendVerificationEmailSuccess
  | SendVerificationEmailError
  | TrySignout
  | TrySignoutAfterSignup
  | SignoutAfterSignupSuccess
  | SignoutSuccess
  | SignoutError
  | TrySignin
  | SigninSuccess
  | SigninError
  | SigninWithEmailNonVerified
  | TryFetchFirestoreCurrentUser
  | FetchFirestoreCurrentUserSuccess
  | FetchFirestoreCurrentUserError
  | TrySetFirestoreCurrentUser
  | SetFirestoreCurrentUserSuccess
  | SetFirestoreCurrentUserError;
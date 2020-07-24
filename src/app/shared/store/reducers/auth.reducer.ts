import { UserFirestoreModel, UserFireAuth } from '../../models/user.model';
import { LOCAL_STORAGE_TOKEN } from '../../models/localStorage.model';
import { AuthActions, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNOUT_SUCCESS, SEND_VERIFICATION_EMAIL_SUCCESS, SIGNOUT_ERROR, SIGNOUT_AFTER_SIGNUP_SUCCESS, SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNIN_WITH_EMAIL_NON_VERIFIED, FETCH_FIRESTORE_CURRENT_USER_SUCCESS, TRY_SIGNUP, UPDATE_AUTH_PROFILE_ERROR, TRY_SIGNIN, TRY_FETCH_FIRESTORE_CURRENT_USER, TRY_SET_FIRESTORE_CURRENT_USER } from '../actions/auth.actions';
import { FirebaseErrorModel } from '../../models/firebase.models';
import { FormActions , FORM_RESET_ERROR_SUCCESS} from '../actions/form.actions';

export interface AuthState {
  user: UserFirestoreModel | UserFireAuth;
  isLoggedIn: boolean;
  token: string;
  loading: boolean;
  error: FirebaseErrorModel;
  success: string;
}

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN),
  loading: false,
  error: null,
  success: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions | FormActions
): AuthState {
  switch (action.type) {
    case TRY_SIGNUP: {
      return {
        ...state,
        loading: true
      }
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
    }
    case SEND_VERIFICATION_EMAIL_SUCCESS: {
      return {
        ...state,
        success: action.payload
      }
    }
    case SIGNOUT_AFTER_SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        token: null,
        error: null
      }
    }
    case SIGNOUT_SUCCESS: {
      return {
        success: action.payload,
        isLoggedIn: false,
        loading: false,
        user: null,
        token: null,
        error: null
      }
    }
    case SIGNOUT_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case TRY_SIGNIN: {
      return {
        ...state,
        loading: true,
        error: null,
        success: null
      }
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        success: action.payload.success,
        error: null
      }
    }
    case SIGNIN_WITH_EMAIL_NON_VERIFIED:
    case SIGNIN_ERROR: {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        success: null,
        error: action.payload
      }
    }
    case TRY_FETCH_FIRESTORE_CURRENT_USER: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    case FETCH_FIRESTORE_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        user: action.payload,
        error: null
      }
    }
    case TRY_SET_FIRESTORE_CURRENT_USER: {
      return {
        ...state,
        loading: true
      }
    }
    case FORM_RESET_ERROR_SUCCESS: {
      return {
        ...state,
        error: null,
        success: null
      }
    }
  }
  return state;
}

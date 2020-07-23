import { UserFirestoreModel } from '../../models/user.model';
import { LOCAL_STORAGE_TOKEN } from '../../models/localStorage.model';
import { AuthActions, SET_CURRENT_USER, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNOUT_SUCCESS, TRY_SEND_VERIFICATION_EMAIL, TRY_UPDATE_AUTH_PROFILE, SEND_VERIFICATION_EMAIL_SUCCESS, UPDATE_AUTH_PROFILE_ERROR } from '../actions/auth.actions';

export interface AuthState {
  user: UserFirestoreModel | firebase.User;
  isLoggedIn: boolean;
  token: string;
  error: any;
  success: string;
}

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN),
  error: null,
  success: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        success: action.payload
      }
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null
      }
    }
    case UPDATE_AUTH_PROFILE_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case SEND_VERIFICATION_EMAIL_SUCCESS: {
      return {
        ...state,
        success: action.payload
      }
    }
  }
  return state;
}

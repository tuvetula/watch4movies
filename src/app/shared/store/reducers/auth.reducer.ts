import { UserFirestoreModel } from '../../models/user.model';
import { LOCAL_STORAGE_TOKEN } from '../../models/localStorage.model';
import { AuthActions, SET_CURRENT_USER } from '../actions/auth.actions';

export interface AuthState {
  user: UserFirestoreModel;
  isLoggedIn: boolean;
  token: string;
  error: string;
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
    case SET_CURRENT_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
  }
  return state;
}

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

export const authSelector = createFeatureSelector("auth");
export const authUserSelector = createSelector(
  authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.user;
    } else {
      return null;
    }
  }
);
export const authSuccessSelector = createSelector(
  authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.success;
    } else {
      return null;
    }
  }
);
export const authErrorSelector = createSelector(
  authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.error;
    } else {
      return null;
    }
  }
);
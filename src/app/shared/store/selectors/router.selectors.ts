import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../helper/router.helper';
import { RouterReducerState } from '@ngrx/router-store';

export const routerSelector = createFeatureSelector('router');
export const routerQueryParamsSelector = createSelector(
  routerSelector,
  (routerState: RouterReducerState<RouterStateUrl>) => {
    if (routerState) {
        
      return routerState.state.queryParams;
    } else {
      return null;
    }
  }
);
export const routerParamsSelector = createSelector(
  routerSelector,
  (routerState: RouterReducerState<RouterStateUrl>) => {
    if (routerState) {
      return routerState.state.params;
    } else {
      return null;
    }
  }
);
export const routerUrlSelector = createSelector(
  routerSelector,
  (routerState: RouterReducerState<RouterStateUrl>) => {
    if (routerState) {
      return routerState.state.url;
    } else {
      return null;
    }
  }
);

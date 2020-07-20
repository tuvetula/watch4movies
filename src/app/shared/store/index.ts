import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './helper/router.helper';

export interface State {
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}

//Déclaration de tous nos reducers
export const reducersMap: ActionReducerMap<State> = {
  auth: authReducer,
  router: routerReducer,
};

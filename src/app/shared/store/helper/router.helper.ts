import { Params, RouterStateSnapshot , ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class MyRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state : ActivatedRouteSnapshot = routerState.root;
    while(state.firstChild){
        state = state.firstChild;
    }
    const { params } = state;
    return { url , queryParams , params };
  }
}


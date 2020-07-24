import { Action } from '@ngrx/store';


export const FORM_RESET_ERROR_SUCCESS = '[ user ] form reset error success';

// FORM_RESET_ERROR_SUCCESS
export class FormResetSuccessError implements Action {
    readonly type = FORM_RESET_ERROR_SUCCESS;
  }

  export type FormActions =
  | FormResetSuccessError;
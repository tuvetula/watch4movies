import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorsMessagesService {
  private defaultErrors = {
    required: () => 'Ce champ est requis.',
    email: () => `Veuillez entrer une adresse mail valide.`,
    pattern: ({actualValue,requiredPattern}) => {
      if(requiredPattern === "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/"){
        return 'Veuillez entrer une adresse mail valide.';
      } else {
        return 'Erreur';
      }
    },
    minlength: ({ requiredLength, actualLength }) =>
      `Ce champ doit comporter au moins ${requiredLength} caractères.`,
    maxlength: ({ requiredLength, actualLength }) =>
      `Ce champ doit comporter ${requiredLength} caractères maximum.`,
    mustMatch: () => 'Les 2 mots de passe ne sont pas identiques',
  };

  constructor() {}

  public getErrorObject(form: FormGroup): any {
    const errorsForm = this.getFormControlFirstErrorMessage(form.controls);
    return errorsForm;
  }

  private getFormControlFirstErrorMessage(controls: {
    [key: string]: AbstractControl;
  }): {} {
    const obj = {};
    for (const key in controls) {
      const ctrl = controls[key];
      if (ctrl instanceof FormGroup) {
        obj[key] = this.getFormControlFirstErrorMessage(ctrl['controls']);
      } else {
        if (ctrl && ctrl.invalid) {
          const messages = this.getErrorMessage(ctrl);
          obj[key] = messages;
        } else {
          obj[key] = '';
        }
      }
    }
    return obj;
  }

  private getErrorMessage(control: AbstractControl): string {
    const firstKey = Object.keys(control.errors)[0];
    const getError = this.defaultErrors[firstKey];
    if (getError) {
      return getError(control.errors[firstKey]);
    } else {
      return 'Erreur';
    }
  }
}

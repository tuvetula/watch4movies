import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorsMessagesService {
  private defaultErrors = {
    required: () => `Ce champ est requis.`,
    email: () => `Veuillez entrer une adresse mail valide`,
    minlength: ({ requiredLength, actualLength }) =>
      `Ce champ doit comporter au moins ${requiredLength} caractères.`,
  };

  constructor() {}

  private getErrorMessage(control: AbstractControl): string {
    const firstKey = Object.keys(control.errors)[0];
    const getError = this.defaultErrors[firstKey];
    return getError(control.errors[firstKey]);
  }

  private checkFormGroupPropertyContainFormGroup(controls: {
    [key: string]: AbstractControl;
  }): string | {} {
    const obj = {};
    for (const key in controls) {
      if (controls[key] instanceof FormGroup) {
        obj[key] = this.checkFormGroupPropertyContainFormGroup(
          controls[key]['controls']
        );
      } else {
        const ctrl = controls[key];
        if (ctrl && ctrl.dirty && ctrl.invalid) {
          const messages = this.getErrorMessage(ctrl);
          obj[key] = messages;
        } else {
          obj[key] = '';
        }
      }
    }
    return obj;
  }
  public getErrorObject(form: FormGroup): any {
    const errorsForm = this.checkFormGroupPropertyContainFormGroup(
      form.controls
    );
    return errorsForm;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, empty, of } from 'rxjs';
import { FormErrorsMessagesService } from 'src/app/shared/services/errors/form-errors-messages.service';
import { TrySignin } from 'src/app/shared/store/actions/auth.actions';
import { authErrorSelector , authSuccessSelector} from '../../../shared/store/selectors/auth.selectors';
import {
  FirebaseErrorModel,
  getFirebaseErrorFrench,
} from 'src/app/shared/models/firebase.models';
import { map, tap, exhaustMap } from 'rxjs/operators';
import { FormResetSuccessError } from 'src/app/shared/store/actions/form.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, OnDestroy {
  public signinForm: FormGroup;
  public hidePassword: boolean = true;

  private signinFormSubscription: Subscription;
  public errorsForm: { [key: string]: any };

  public trySigninError$: Observable<string>;
  public trySigninSuccess$: Observable<string>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private formErrorsMessageService: FormErrorsMessagesService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
            Validators.required,
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
      { updateOn: 'blur' }
    );
    this.signinFormSubscription = this.signinForm.statusChanges.subscribe(() =>
      this.changeStatusForm()
    );

    this.trySigninError$ = this.store.pipe(
      select(authErrorSelector),
      exhaustMap((error: FirebaseErrorModel) => {
        if (error) {
          return of(error).pipe(
            map((error) => getFirebaseErrorFrench(error))
          )
        } else {
          return empty();
        }
      }),
    );
    this.trySigninSuccess$ = this.store.select(authSuccessSelector);
  }
  public onSubmit() {
    if (this.signinForm.valid) {
      this.store.dispatch(new TrySignin(this.signinForm.value));
    } else {
      this.changeStatusForm();
    }
  }
  private changeStatusForm(): void {
    if (this.signinForm) {
      this.errorsForm = this.formErrorsMessageService.getErrorObject(
        this.signinForm
      );
    }
  }
  ngOnDestroy(): void {
    this.signinFormSubscription.unsubscribe();
    this.store.dispatch(new FormResetSuccessError());
  }
}

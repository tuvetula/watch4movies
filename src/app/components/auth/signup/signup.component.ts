import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, from } from 'rxjs';
import { TrySignup } from 'src/app/shared/store/actions/auth.actions';
import { FormErrorsMessagesService } from 'src/app/shared/services/errors/form-errors-messages.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy {
  public signupForm: FormGroup;
  public hidePassword: boolean = true;

  private signupFormSubscription: Subscription
  public errorsForm: {};
  
  public signupError$: Observable<string>;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private formErrorsMessageService: FormErrorsMessagesService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(2)]],
      firstName: ['',[Validators.required,Validators.minLength(2)]],
      email: ['',[Validators.email,Validators.required]],
      passwords: this.fb.group({
        password: ['',[Validators.required, Validators.minLength(8)]],
        confirmPassword: ['',[Validators.required, Validators.minLength(8)]]
      })
    });
    this.signupFormSubscription = this.signupForm.statusChanges.subscribe(
      () => this.changeStatusForm()
    )
  }

  public onSubmit(){    
    console.log(this.signupForm);
    if(this.signupForm.valid){
      this.store.dispatch(new TrySignup(this.signupForm.value));
    }
  }

  private changeStatusForm(): void {
    if (this.signupForm) {
      this.errorsForm = this.formErrorsMessageService.getErrorObject(this.signupForm);
     }
  }

  ngOnDestroy(): void {
    this.signupFormSubscription.unsubscribe();
  }
}

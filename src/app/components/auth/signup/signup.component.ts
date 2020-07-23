import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TrySignup } from 'src/app/shared/store/actions/auth.actions';
import { FormErrorsMessagesService } from 'src/app/shared/services/errors/form-errors-messages.service';
import { MustMatch } from 'src/app/shared/services/errors/password-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy {
  public signupForm: FormGroup;
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  private signupFormSubscription: Subscription
  public errorsForm: {[key: string]:any};
  
  public trySignupError$: Observable<string>;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private formErrorsMessageService: FormErrorsMessagesService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(2)]],
      firstName: ['',[Validators.required,Validators.minLength(2)]],
      email: ['',[Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),Validators.required]],
      passwords: this.fb.group({
        password: ['',[Validators.required, Validators.minLength(8)]],
        confirmPassword: ['',[Validators.required, Validators.minLength(8)]]
      },{
        validator: MustMatch('password', 'confirmPassword')
    })
    },{ updateOn: 'blur' });
    this.signupFormSubscription = this.signupForm.statusChanges.subscribe(
      () => this.changeStatusForm()
    )
  }

  public onSubmit(){    
    if(this.signupForm.valid){
      this.store.dispatch(new TrySignup(this.signupForm.value));
    } else {
      this.changeStatusForm();
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

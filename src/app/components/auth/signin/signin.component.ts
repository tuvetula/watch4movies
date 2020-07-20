import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;
  public hidePassword: boolean = true;
  public error: string =null;
  public signinError$: Observable<string>;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    })
  }
  public submit(){
    console.log('coucou signin');
    
  }

}

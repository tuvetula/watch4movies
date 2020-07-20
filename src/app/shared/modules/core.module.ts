import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFound404Component } from 'src/app/components/page-not-found404/page-not-found404.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { LayoutModule } from './layout.module';
import { SigninComponent } from 'src/app/components/auth/signin/signin.component';
import { SignupComponent } from 'src/app/components/auth/signup/signup.component';
import { ForgotPasswordComponent } from 'src/app/components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'src/app/components/auth/verify-email/verify-email.component';

const COMPONENTS = [
  PageNotFound404Component,
  HomepageComponent,
  TopbarComponent,
  SigninComponent,
  SignupComponent,
  ForgotPasswordComponent,
  VerifyEmailComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    LayoutModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class CoreModule { }

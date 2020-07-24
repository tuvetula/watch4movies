//Modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout.module';
//Services
import { AuthService } from '../services/auth.service';
//Components
import { PageNotFound404Component } from 'src/app/components/page-not-found404/page-not-found404.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { SignupComponent } from 'src/app/components/auth/signup/signup.component';
import { SigninComponent } from 'src/app/components/auth/signin/signin.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { StringFunctionsService } from '../services/utilities/string/string-functions.service';

const COMPONENTS = [
  PageNotFound404Component,
  HomepageComponent,
  SignupComponent,
  SigninComponent,
  TopbarComponent
];

@NgModule({
  declarations: [...COMPONENTS
  ],
  imports: [
    LayoutModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [...COMPONENTS,LayoutModule],
  providers:[
    AuthService,
    StringFunctionsService
  ]
})
export class CoreModule { }
import { BrowserModule } from '@angular/platform-browser';
//Modules
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './shared/modules/core.module';
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
//environment
import { environment } from '../environments/environment'; // Angular CLI environment
//Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducersMap } from './shared/store/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { MyRouterStateSerializer } from './shared/store/helper/router.helper';
//Firebase
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducersMap),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      name: 'ngrx photos',
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    AppRoutingModule,
  ],
  providers: [AngularFireAuth , 
    { 
      provide: RouterStateSerializer, 
      useClass: MyRouterStateSerializer
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}

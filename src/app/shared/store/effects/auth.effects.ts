import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { State } from '..';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import {
  TRY_SIGNUP,
  TrySignup,
  SignupSuccess,
  SignupError,
  SIGNUP_SUCCESS,
  UpdateAuthProfilError,
  SendVerificationEmailSuccess,
  SendVerificationEmailError,
  SEND_VERIFICATION_EMAIL_SUCCESS,
  SignoutSuccess,
  SignoutError,
  TRY_SIGNOUT,
  TrySignout,
  SIGNOUT_SUCCESS,
  TRY_UPDATE_AUTH_PROFILE,
  TryUpdateAuthProfile,
  TRY_SEND_VERIFICATION_EMAIL,
  TrySendVerificationEmail,
  UPDATE_AUTH_PROFILE_SIGNUP_SUCCESS,
  UpdateAuthProfileSignupSuccess,
} from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { UserSignup } from '../../models/user.model';
import { of } from 'rxjs';
import { authUserSelector } from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {
  // TRY SIGNUP
  // On signup l'utilisateur
  @Effect() trySignup$ = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    map((action: TrySignup) => action.payload),
    exhaustMap((user: UserSignup) => {
      return this.authService.SignUp(user).pipe(
        map(() => new SignupSuccess('Votre compte a bien été enregistré. Veuillez consulter votre boite mail afin de valider votre inscription.')),
        catchError((error) => of(new SignupError(error)))
        );
      }),
  );
  //SIGNUP SUCCESS
  //Après signup, on met à jour le profil sur firebase
  @Effect()
  signupSuccess$ = this.actions$.pipe(
    ofType(SIGNUP_SUCCESS),
    map(() => new TrySignout())
  );
  //TRY SIGNOUT
  @Effect() trySignoutAfterSignup$ = this.actions$.pipe(
    ofType(TRY_SIGNOUT),
    exhaustMap(() =>
      this.authService.signOut().pipe(
        map(() => new SignoutSuccess()),
        catchError((error) => of(new SignoutError(error)))
      )
    )
  );
  //SIGNOUT SUCCESS
  @Effect({ dispatch: false }) signoutAfterSignupSuccess$ = this.actions$.pipe(
    ofType(SIGNOUT_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );


  // // TRY UPDATE AUTH PROFILE
  // @Effect()
  // tryUpdateProfile$ = this.actions$.pipe(
  //   ofType(TRY_UPDATE_AUTH_PROFILE),
  //   exhaustMap(
  //     () => this.store.pipe(select(authUserSelector)),
  //     exhaustMap((firebaseUser: firebase.User) => {
  //       console.log(firebaseUser);
        
  //       return this.authService.updateAuthProfile(firebaseUser).pipe(
  //         tap(() => console.log('coucou tap tryUpdateProfile')
  //         ),
  //         map(() => new UpdateAuthProfileSignupSuccess()),
  //         catchError((error) => of(new UpdateAuthProfilError(error)))
  //       );
  //     })
  //   )
  // );
  // //UPDATE AUTH PROFILE SIGNUP SUCCESS 
  // //Après avoir mis à jour le profil, on envoi un mail de vérification d'email
  // @Effect() updateAuthProfileSignupSuccess$ = this.actions$.pipe(
  //   ofType(UPDATE_AUTH_PROFILE_SIGNUP_SUCCESS),
  //   map(() => new TrySendVerificationEmail())
  // );
  // //TRY SEND VERIFICATION EMAIL
  // @Effect() trySendVerificationEmail$ = this.actions$.pipe(
  //   ofType(TRY_SEND_VERIFICATION_EMAIL),
  //   exhaustMap(() => this.store.pipe(select(authUserSelector))),
  //   exhaustMap((user: firebase.User) => {
  //     return this.authService.SendVerificationMail(user).pipe(
  //       map(
  //         () =>
  //           new SendVerificationEmailSuccess(
  //             'Vous allez recevoir un mail afin de vérifier votre email et valider votre inscription.'
  //           )
  //       ),
  //       catchError((error) => of(new SendVerificationEmailError(error)))
  //     );
  //   })
  // );
  // //SEND VERIFICATION EMAIL SUCCESS
  // //Après avoir envoyé le mail de vérification, on déconnecte l'utilisateur
  // //(Sur firebase l'utilisateur est automatiquement connecté après signup)
  // @Effect() sendVerificationEmailSuccess$ = this.actions$.pipe(
  //   ofType(SEND_VERIFICATION_EMAIL_SUCCESS),
  //   map(() => new TrySignout())
  // );

  
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}
}


// @Effect() trySignup$ = this.actions$.pipe(
//   ofType(TRY_SIGNUP),
//   map((action: TrySignup) => action.payload),
//   exhaustMap((user: UserSignup) => {
//     return this.authService.SignUp(user).pipe(
//       map((resultUser: firebase.auth.UserCredential) => {
//         return {credentials: resultUser,name: user.name, firstName: user.firstName}
//       }),
//       catchError((error) => of(new SignupError(error)))
//       );
//     }),
//     exhaustMap((resultObject : {credentials: firebase.auth.UserCredential,name: string, firstName: string}) => {
//       return this.authService.updateAuthProfile(resultObject).pipe(
//         map(() => resultObject.credentials),
//         catchError((error) => of(new UpdateAuthProfilError(error)))
//       );
//     }),
//     exhaustMap((user: firebase.auth.UserCredential) => {
//       return this.authService.SendVerificationMail(user).pipe(
//         catchError((error) => of(new SendVerificationEmailError(error)))
//       )
//     }),
//     exhaustMap(() => {
//       return this.authService.signOut().pipe(
//         map(() => new SignupSuccess('signup ok')),
//         catchError((error) => of(new SignoutError(error)))
//       )
//     })
// );
import { Store, select, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { State } from '..';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, tap, switchMap, take } from 'rxjs/operators';

import {
  TRY_SIGNUP,
  TrySignup,
  SignupSuccess,
  SignupError,
  SIGNUP_SUCCESS,
  UpdateAuthProfileError,
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
  UpdateAuthProfileSignupSuccess,
  UPDATE_AUTH_PROFILE_SIGNUP_SUCCESS,
  TrySignoutAfterSignup,
  SignoutAfterSignupSuccess,
  TRY_SIGNIN,
  TrySignin,
  SigninError,
  SigninWithEmailNonVerified,
  SigninSuccess,
  SIGNIN_SUCCESS,
  TRY_FETCH_FIRESTORE_CURRENT_USER,
  FetchFirestoreCurrentUserSuccess,
  TrySetFirestoreCurrentUser,
  FetchFirestoreCurrentUserError,
  FETCH_FIRESTORE_CURRENT_USER_SUCCESS,
  TRY_SET_FIRESTORE_CURRENT_USER,
  TryFetchFirestoreCurrentUser,
  SetFirestoreCurrentUserSuccess,
  SET_FIRESTORE_CURRENT_USER_SUCCESS,
  TRY_SIGNOUT_AFTER_SIGNUP,
} from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import {
  UserSignup,
  UserFireAuth,
  UserFirestoreModel,
} from '../../models/user.model';
import { of, from, empty } from 'rxjs';
import { authUserSelector } from '../selectors/auth.selectors';
import { FirebaseError } from 'firebase';
import { StringFunctionsService } from '../../services/utilities/string/string-functions.service';

@Injectable()
export class AuthEffects {
  // TRY SIGNUP
  // On signup l'utilisateur
  @Effect() trySignup$ = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    map((action: TrySignup) => action.payload),
    map((user: UserSignup) => {
      return {
        ...user,
        email: user.email.trim().toLowerCase(),
        name: this.stringFunctionsService.capitalizeFirstLetter(
          user.name.trim()
        ),
        firstName: this.stringFunctionsService.capitalizeFirstLetter(
          user.firstName.trim()
        ),
      };
    }),
    exhaustMap((userSignup: UserSignup) => {
      return from(this.authService.SignUp(userSignup)).pipe(
        map((credentials) => {
          return new SignupSuccess({
            uid: credentials.user.uid,
            email: credentials.user.email,
            displayName: credentials.user.displayName,
            emailVerified: credentials.user.emailVerified,
            photoURL: credentials.user.photoURL,
            name: userSignup.name,
            firstName: userSignup.firstName,
          });
        }),
        catchError((error) => of(new SignupError(error)))
      );
    })
  );
  //SIGNUP SUCCESS
  //Après signup, on met à jour le profil sur firebase
  @Effect()
  signupSuccess$ = this.actions$.pipe(
    ofType(SIGNUP_SUCCESS),
    map(() => new TryUpdateAuthProfile())
  );
  // TRY UPDATE AUTH PROFILE
  @Effect()
  tryUpdateProfile$ = this.actions$.pipe(
    ofType(TRY_UPDATE_AUTH_PROFILE),
    exhaustMap(() => {
      return this.store.select(authUserSelector).pipe(
        take(1)
      );
    }),
    exhaustMap((userStore: UserFireAuth) => {
      return from(this.authService.updateAuthProfile(userStore)).pipe(
        map(() => new UpdateAuthProfileSignupSuccess()),
        catchError((error: FirebaseError) => {
          console.log(error.message);
          return of(new UpdateAuthProfileError(error)).pipe(
            map(() => new TrySendVerificationEmail())
          );
        })
      );
    })
  );
  //UPDATE AUTH PROFILE SIGNUP SUCCESS
  //Après avoir mis à jour le profil, on envoi un mail de vérification d'email
  @Effect() updateAuthProfileSignupSuccess$ = this.actions$.pipe(
    ofType(UPDATE_AUTH_PROFILE_SIGNUP_SUCCESS),
    map(() => new TrySendVerificationEmail())
  );
  //TRY SEND VERIFICATION EMAIL
  @Effect() trySendVerificationEmail$ = this.actions$.pipe(
    ofType(TRY_SEND_VERIFICATION_EMAIL),
    exhaustMap((user: firebase.User) => {
      return from(this.authService.SendEmailVerification()).pipe(
        map(
          () =>
            new SendVerificationEmailSuccess(
              "Veuillez consulter votre boite mail afin de valider l'inscription."
            )
        ),
        catchError((error: FirebaseError) => {
          console.log(error.message);
          return empty();
        })
      );
    })
  );
  //SEND VERIFICATION EMAIL SUCCESS
  //Après avoir envoyé le mail de vérification, on déconnecte l'utilisateur
  //(Sur firebase l'utilisateur est automatiquement connecté après signup)
  @Effect() sendVerificationEmailSuccess$ = this.actions$.pipe(
    ofType(SEND_VERIFICATION_EMAIL_SUCCESS),
    map(() => new TrySignoutAfterSignup())
  );

  //TRY SIGNOUT AFTER SIGNUP
  @Effect() trySignoutAfterSignup$ = this.actions$.pipe(
    ofType(TRY_SIGNOUT_AFTER_SIGNUP),
    exhaustMap(() =>
      this.authService.signOut().pipe(
        map(() => new SignoutAfterSignupSuccess()),
        catchError((error: FirebaseError) => {
          console.log(error.message);
          return empty();
        })
      )
    )
  );

  //-------------------------------------------------
  //----------------------SIGNIN---------------------
  //-------------------------------------------------

  //TRY SIGNIN
  @Effect() trySignin$ = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    map((action: TrySignin) => action.payload),
    exhaustMap((credential) => {
      return from(
        this.authService.SignIn(credential.email, credential.password)
      ).pipe(
        map((user: firebase.auth.UserCredential) => {
          if (user.user.emailVerified) {
            return new SigninSuccess({
              user: {
                uid: user.user.uid,
                email: user.user.email,
                displayName: user.user.displayName,
                photoURL: user.user.photoURL,
                emailVerified: user.user.emailVerified,
              },
              success: 'Bienvenue ' + user.user.displayName,
            });
          } else {
            return new SigninWithEmailNonVerified({
              code: 'EMAIL_NON_VERIFIED',
              message: 'Vous devez valider la vérification de votre email.',
            });
          }
        }),
        catchError((error: FirebaseError) => of(new SigninError(error)))
      );
    })
  );
  //SIGNIN SUCCESS
  @Effect() signinSuccess$ = this.actions$.pipe(
    ofType(SIGNIN_SUCCESS),
    map(() => new TryFetchFirestoreCurrentUser())
  );
  //TRY FETCH FIRESTORE CURRENT USER
  @Effect() TryFetchFirestoreCurentUser$ = this.actions$.pipe(
    ofType(TRY_FETCH_FIRESTORE_CURRENT_USER),
    exhaustMap(() => this.store.select(authUserSelector).pipe(take(1))),
    exhaustMap((user: UserFireAuth) => {
      console.log('TRY FETCH FIRESTORE CURRENT USER');
      return this.authService.getCurrentUserFromFirestore(user.uid).pipe(
        map((userData: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
          ) => {
            console.log(userData);
            if (userData.exists) {
              const user: UserFirestoreModel = JSON.parse(JSON.stringify(userData.data()));
              console.log(user);
              return new FetchFirestoreCurrentUserSuccess(user);
            } else {
              return new TrySetFirestoreCurrentUser();
            }
          }
        ),
        catchError((error) => {
          console.log(error);
          return empty();
        })
      );
    })
  );
  //TRY SET FIRESTORE CURRENT USER
  @Effect() trySetFirestoreCurrentUser$ = this.actions$.pipe(
    ofType(TRY_SET_FIRESTORE_CURRENT_USER),
    exhaustMap(() => this.store.pipe(select(authUserSelector),take(1))),
    exhaustMap((userStoreData: UserFireAuth) => {
      return from(this.authService.SetUserFirestore(userStoreData)).pipe(
        map(() => new SetFirestoreCurrentUserSuccess()),
        catchError((error) => {
          console.log(error);
          return empty();
        })
      );
    })
  );
  //SET FIRESTORE CURRENT USER SUCCESS
  @Effect() setFirestoreCurrentUser$ = this.actions$.pipe(
    ofType(SET_FIRESTORE_CURRENT_USER_SUCCESS),
    map(() => new TryFetchFirestoreCurrentUser())
  );

  //TRY SIGNOUT
  @Effect() trySignout$ = this.actions$.pipe(
    ofType(TRY_SIGNOUT),
    exhaustMap(() =>
      this.authService.signOut().pipe(
        map(() => new SignoutSuccess('Vous avez été déconnecté.')),
        catchError((error) => of(new SignoutError(error)))
      )
    )
  );
  //SIGNOUT SUCCESS
  @Effect({ dispatch: false }) signoutSuccess$ = this.actions$.pipe(
    ofType(SIGNOUT_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private stringFunctionsService: StringFunctionsService,
    private router: Router,
    private store: Store<State>
  ) {}
}

import { Injectable, NgZone } from '@angular/core';
import { UserFirestoreModel, UserSignup, UserFireAuth } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, exhaustMap, map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public firestoreService: AngularFirestore, // Inject Firestore service
    public firebaseAuthService: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.firebaseAuthService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  public SignIn(email: string, password: string) {
    return this.firebaseAuthService.signInWithEmailAndPassword(email, password);
  }

  // Sign up with email/password
  public SignUp(user: UserSignup) {
    return this.firebaseAuthService.createUserWithEmailAndPassword(
        user.email,
        user.passwords.password
      )
  }
  //update auth profile
  public updateAuthProfile(userStore: UserFireAuth) {
    const displayName = userStore.name && userStore.firstName ? userStore.name + ' ' + userStore.firstName : '';
    return firebase.auth().currentUser.updateProfile({
      displayName: displayName,
      photoURL: userStore.photoURL
    })
  }
  //Send verification email
  public SendEmailVerification(){
    return firebase.auth().currentUser.sendEmailVerification({
      url: "http://localhost:4200/sign-in"
    });
  }
  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    try {
      await this.firebaseAuthService.sendPasswordResetEmail(passwordResetEmail);
      window.alert(
        'Vous allez recevoir un mail pour réinitialiser votre mot de passe.'
      );
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.firebaseAuthService
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserFirestore(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  public SetUserFirestore(user: UserFireAuth): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    const currentUserData: UserFirestoreModel = {
      uid: currentUser.uid,
      name: currentUser.displayName.split(' ')[0],
      firstName: currentUser.displayName.split(' ')[1],
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      emailVerified: currentUser.emailVerified,
      isAdmin: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.firestoreService
        .collection('users')
        .doc(currentUserData.uid)
        .set(currentUserData, { merge: true })
    ;
  }

  public getCurrentUserFromFirestore(uid: string){
    return this.firestoreService.collection('users').doc(uid).get();
  }

  // Sign out
  public signOut(): Observable<void> {
    return from(this.firebaseAuthService.signOut());
  }
}

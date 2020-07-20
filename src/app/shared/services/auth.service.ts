import { Injectable, NgZone } from '@angular/core';
import { UserFireAuth, UserFirestoreModel } from '../models/user.model';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public firestoreService: AngularFirestore, // Inject Firestore service
    public authenticationService: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.authenticationService.authState.subscribe((user) => {
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
  SignIn(email: string, password: string) {
    return this.authenticationService.signInWithEmailAndPassword(email, password)
  }

  // Sign up with email/password
  public async SignUp(email: string, password: string , name: string , firstName: string) {
    try {
      const result = await this.authenticationService
        .createUserWithEmailAndPassword(email, password);
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user, name, firstName);
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.authenticationService.currentUser.then((user: firebase.User) => {
      user.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
    })
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail : string) {
    try {
      await this.authenticationService
        .sendPasswordResetEmail(passwordResetEmail);
      window.alert('Vous allez recevoir un mail pour réinitialiser votre mot de passe.');
    }
    catch (error) {
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
    return this.authenticationService
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: UserFireAuth , name: string = null , firstName: string = null) {
    const userRef: AngularFirestoreDocument<any> = this.firestoreService.doc(
      `users/${user.uid}`
    );
    const userData: UserFirestoreModel = {
      uid: user.uid,
      name: name,
      firstName: firstName,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAdmin: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.authenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}

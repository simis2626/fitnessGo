// src/app/auth/auth.service.ts

import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/operator/filter";
import auth0 from "auth0-js";
import {AuthLocalService} from "./auth-local.service";
import {UserService} from "./user.service";

declare var gapi: any;

@Injectable()
export class Auth0AuthService {

  public auth2: any = {}; // The Sign-In object.
  googleUser = null; // The current user.



  auth0 = new auth0.WebAuth({
    clientID: 'fDgufBDYp6i14X1ifFTDedkUKdikfiQu',
    domain: 'simis2626.au.auth0.com',
    responseType: 'token id_token',
    audience: 'https://simis2626.au.auth0.com/userinfo',
    redirectUri: 'https://fitness.fitforchange.me:81/',
    scope: 'openid profile',
    leeway: 60
  });

  constructor(public router: Router, private authLocalService: AuthLocalService, private userService: UserService) {
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log(err, authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult.expiresIn);
        window.location.hash = '';
        this.setSession(authResult);
        this.authLocalService.setLoginState(true);
        this.userService.receiveProfile(authResult.idTokenPayload);
      } else if (err) {
        console.log(err);
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.authLocalService.setLoginState(false);
    // Go back to the home route
    //this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log('currentTime:', new Date().getTime(), 'tokenTime:', expiresAt);
    return new Date().getTime() < expiresAt;
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log('expiresTime', expiresAt);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('id_sub', authResult.idTokenPayload.sub);
  }


  /**
   * Calls startAuth after Sign in V2 finishes setting up.
   */
  appStart() {
    setTimeout(() => {
      gapi.load('auth2', this.initSigninV2);

    }, 2000);
  };

  /**
   * Initializes Signin v2 and sets up listeners.
   */
  initSigninV2() {

    this.auth2 = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    this.auth2.isSignedIn.listen(this.signinChanged);

    // Listen for changes to current user.
    this.auth2.currentUser.listen(this.userChanged);

    // Sign in the user if they are currently signed in.
    if (this.auth2.isSignedIn.get() == true) {
      this.auth2.signIn();
    }

    // Start with the current live values.
    this.refreshValues();
  };

  /**
   * Listener method for sign-out live value.
   *
   * @param {boolean} val the updated signed out state.
   */
  signinChanged(val) {
    console.log('Signin state changed to ', val);
  };

  /**
   * Listener method for when the user changes.
   *
   * @param {GoogleUser} user the updated user.
   */
  userChanged(user) {
    console.log('User now: ', user);
    this.googleUser = user;
    this.updateGoogleUser();
  };

  /**
   * Updates the properties in the Google User table using the current user.
   */
  updateGoogleUser() {
    if (this.googleUser) {
      console.log(this.googleUser);
    } else {
    }
  };

  /**
   * Retrieves the current user and signed in states from the GoogleAuth
   * object.
   */
  refreshValues() {
    if (this.auth2) {
      console.log('Refreshing values...');

      this.googleUser = this.auth2.currentUser.get();


      this.updateGoogleUser();
    }
  }



}

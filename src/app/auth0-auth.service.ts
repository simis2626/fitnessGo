// src/app/auth/auth.service.ts

import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/operator/filter";
import {AuthLocalService} from "./auth-local.service";
import {UserService} from "./user.service";

declare var gapi: any;

@Injectable()
export class Auth0AuthService {

  public auth2: any = {}; // The Sign-In object.
  googleUser = null; // The current user.
  authInitiated: boolean;


  constructor(public router: Router, private authLocalService: AuthLocalService, private userService: UserService) {
    this.authInitiated = false;
    this.checkForgapi()
      .then(() => {
        let that = this;
        gapi.load('auth2', function () {
          gapi.auth2.init({
            client_id: '190002128182-ei7n8eh95nourb0sdcoh2o12cindv9rp.apps.googleusercontent.com',
            fetch_basic_profile: false,
            scope: 'openid profile email',
            ux_mode: 'redirect',
            redirect_uri: 'https://fitness.fitforchange.me:81'
          }).then((obj) => {
            that.googleUser = obj;
            that.authInitiated = true;
            that.googleUser.isSignedIn.listen(that.getProfile);
            that.getProfile(that.googleUser.isSignedIn.get());
          });
        });
      });
  }


  checkForgapi(): Promise<{}> {
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {
        if ('undefined' != typeof gapi) {
          clearInterval(timer);
          resolve();
        }

      }, 30);
    });

  }

  public renderSigin() {
    this.checkForgapi().then(() => {
      gapi.signin2.render('signin-ele', {
        scope: 'profile openid email',
        width: 120,
        height: 36,
        longtitle: false,
        theme: 'dark',
        onsuccess: null,
        onfailure: null
      });
    });

  }

  public login(): void {
    this.googleUser.signIn();
  }

  public logout(): void {
    this.checkForgapi().then(() => {
      this.authLocalService.setLoginState(false);
      this.googleUser.signOut();

    });

  }

  checkForAuth2(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.checkForgapi().then(() => {
        let timer = setInterval(() => {
          if ('undefined' != typeof gapi.auth2) {
            clearInterval(timer);
            resolve();
          }

        }, 60);
      });
    });

  }


  public getProfile(blnSignedIn: boolean): any {
    if (blnSignedIn) {
      let timer = setInterval(() => {
        if (this.authInitiated) {
          clearInterval(timer);
          let googUser = this.googleUser.currentUser.get();
          let googProfile = googUser.getBasicProfile();
          this.userService.receiveProfile(googProfile);
        }
      }, 5);
    }
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('id_sub', authResult.idTokenPayload.sub);
  }


  public isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.checkForAuth2().then(() => {
        let timer = setInterval(() => {
          if (this.authInitiated) {
            clearInterval(timer);
            let googauth = gapi.auth2.getAuthInstance();
            let answer = googauth.isSignedIn.get();
            resolve(answer);
          }
        }, 5);
      });
    });
  }

}

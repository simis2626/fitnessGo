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


  constructor(public router: Router, private authLocalService: AuthLocalService, private userService: UserService) {
    Promise.all([
    this.checkForAuth2(),
    this.checkForgapi()])

  .then(() =>{
        gapi.auth2.init({
          client_id: '190002128182-ei7n8eh95nourb0sdcoh2o12cindv9rp.apps.googleusercontent.com',
          fetch_basic_profile: true,
          ux_mode: 'redirect'
        }).then((obj)=>{
          console.log('finished',obj);
        });
      });
  }
  checkForAuth2():Promise<{}>{
    return new Promise((resolve, reject) =>{
      let timer  = setInterval(()=>{
        if('undefined' != typeof gapi.auth2) {
          console.log(typeof gapi.auth2);
          clearInterval(timer);
          resolve();
        }

      },60);
    });

  }



  checkForgapi():Promise<{}>{
    return new Promise((resolve, reject) =>{
      let timer  = setInterval(()=>{
        if('undefined' != typeof gapi) {
          console.log(typeof gapi);
          clearInterval(timer);
          resolve();
        }

      },30);
    });

  }





  public renderSigin(){
    this.checkForgapi().then(()=>{
      console.log('rendering');
      gapi.signin2.render('signin-ele',{
        scope: 'profile',
        width: 120,
        height: 36,
        longtitle: true,
        theme: 'dark',
        onsuccess: null,
        onfailure: null
      });});

  }
//sausages

  public login(): void {

  }

  public handleAuthentication(): void {

  }

  public logout(): void {

  }

  public isAuthenticated(): boolean {
    return false;
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
      gapi.load('auth2', this.initSigninV2);

  };

  /**
   * Initializes Signin v2 and sets up listeners.
   */
  initSigninV2() {

    this.auth2 = gapi.auth2.getAuthInstance();


    // Sign in the user if they are currently signed in.
    if (this.auth2.isSignedIn.get() == true) {
      this.auth2.signIn();
    }

    // Start with the current live values.
    this.refreshValues();
  };
  /**
   * Retrieves the current user and signed in states from the GoogleAuth
   * object.
   */
  refreshValues() {
    if (this.auth2) {
      console.log('Refreshing values...');

      this.googleUser = this.auth2.currentUser.get();

    }
  }



}

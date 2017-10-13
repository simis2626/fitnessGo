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
  authState:boolean;
  waitProc:boolean = false;


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
              console.log(obj);
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

      }, 400);
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

        }, 400);
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
      },400);
    }
  }
  
  
  private pauseForProc():Promise<any> {
      return new Promise((resolve,reject) =>{
          
      if (this.waitProc) {
          console.log("waiting...");
        let timer2 = setInterval(()=>{
            if(!this.waitProc){
                console.log("finished waiting");
                clearInterval(timer2);
                resolve();
            }
            
        },200);
    }else{
        console.log("didn't need to wait");
        resolve();
    }
  });
  }
  
  
  
  
  

  public isAuthenticated(): Promise<boolean> {
      
    return new Promise((resolve, reject) => {
    this.pauseForProc().then(()=>{ 
    if(this.authState){
        resolve(this.authState);
    }else{
        this.waitProc = true;
      this.checkForAuth2().then(() => {
        let timer = setInterval(() => {
          if (this.authInitiated) {
            clearInterval(timer);
            console.log("here");
            let googauth = gapi.auth2.getAuthInstance();
            this.authState = googauth.isSignedIn.get();
            this.waitProc = false;
            this.authState ? googauth.currentUser.get().reloadAuthResponse().then( x => this.setSession(x)) : console.log('not logged in');
            resolve(this.authState);
          }
        }, 30000);
      });
    }});});

  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
    
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('id_token', authResult.id_token);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('id_sub', 'google-oauth2|' + gapi.auth2.getAuthInstance().currentUser.get().getId());
  }

}

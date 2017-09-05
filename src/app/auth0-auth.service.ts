// src/app/auth/auth.service.ts

import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/operator/filter";
import auth0 from "auth0-js";
import {AuthLocalService} from "./auth-local.service";
import {UserService} from "./user.service";

@Injectable()
export class Auth0AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'fDgufBDYp6i14X1ifFTDedkUKdikfiQu',
    domain: 'simis2626.au.auth0.com',
    responseType: 'token id_token',
    audience: 'https://simis2626.au.auth0.com/userinfo',
    redirectUri: 'https://fitness.fitforchange.me:81',
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
    return new Date().getTime() < expiresAt;
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 604800) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('id_sub', authResult.idTokenPayload.sub);
  }

}

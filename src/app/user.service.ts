import { Injectable } from '@angular/core';
import {Auth0AuthService} from "./auth0-auth.service";

@Injectable()
export class UserService {

  constructor(private auth0AuthService:Auth0AuthService) { }

  userProfile: any;

  getProfile():Promise<any> {
    return new Promise((resolve,reject) => {
      if (this.userProfile) {
        resolve(this.userProfile)
      } else {
        this.getRemoteProfile((err, profile) => {
          resolve(this.userProfile);
        });
      }
    });
  }


//...
  public getRemoteProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0AuthService.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  receiveProfile(profile:any): void {
  this.userProfile = profile;

}

}

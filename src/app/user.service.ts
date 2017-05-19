import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  userProfile: any;

  public getProfile(): Promise<any> {
    return new Promise((resolve,reject) => {
      if (this.userProfile) {
        resolve(this.userProfile);
      } else {
        // this.getRemoteProfile((err, profile) => {
          resolve(this.userProfile);
       // });
      }
    });
  }

  /*public getRemoteProfile(cb:any): void {
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
  }*/

  public receiveProfile(profile:any): void {
  this.userProfile = profile;

}

}

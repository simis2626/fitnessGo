import {Injectable} from "@angular/core";

@Injectable()
export class UserService {

  constructor() { }

  userProfile: any;

  public getProfile(): Promise<any> {
    return new Promise((resolve,reject) => {
      if (this.userProfile) {
        localStorage.setItem('fitnessProfile', JSON.stringify(this.userProfile));
        resolve(this.userProfile);
      } else {
        this.userProfile = JSON.parse(localStorage.getItem('fitnessProfile'));
        resolve(this.userProfile);
      }
    });
  }

  public getRemoteProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    cb();
  }

  public receiveProfile(profile:any): void {
  this.userProfile = profile;

}

}

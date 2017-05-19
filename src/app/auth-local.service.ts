import { Injectable } from '@angular/core';

@Injectable()
export class AuthLocalService {
  loginState:boolean
  constructor() { }

  userLoggedIn(): Promise<boolean>{


    return new Promise((resolve, reject) => {


      setTimeout(() => {resolve(this.loginState);}, 1500);


    });




}


  setLoginState(state:boolean){
    console.log("loginState set to", state);
      this.loginState = state;
  }



}

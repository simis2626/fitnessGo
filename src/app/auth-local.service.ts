import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';



@Injectable()
export class AuthLocalService {
  loginState:boolean
  constructor() { }
  public LoginStateChange = new Subject<boolean>();
  loginStateChange$ = this.LoginStateChange.asObservable();


  userLoggedIn(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {resolve(this.loginState);}, 1500);
    });
}

  setLoginState(state:boolean){
    console.log("loginState set to", state);
      this.loginState = state;
      this.LoginStateChange.next(state);
  }



}

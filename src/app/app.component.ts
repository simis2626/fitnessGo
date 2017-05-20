import { Component, OnInit } from '@angular/core';
import { AuthLocalService } from './auth-local.service'
import {Auth0AuthService} from "./auth0-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private localAuthService: AuthLocalService, private auth0service:Auth0AuthService) {}

  ngOnInit(){
    this.loginState = this.auth0service.isAuthenticated();
    this.auth0service.handleAuthentication();
    this.localAuthService.userLoggedIn().then((result)=> this.loginState = result);

    this.localAuthService.loginStateChange$.subscribe((state) => {
      this.loginState = state;
    });

  }





  loginState:boolean

  title = 'app works!';
}

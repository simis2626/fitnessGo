import {Component, OnInit} from "@angular/core";
import {AuthLocalService} from "./auth-local.service";
import {Auth0AuthService} from "./auth0-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginState: boolean;

  constructor(private localAuthService: AuthLocalService, private auth0service: Auth0AuthService) {
  }

  ngOnInit() {
    if (this.auth0service.isAuthenticated()) {
      this.localAuthService.setLoginState(true);


    } else {
      setTimeout(() => {
        this.auth0service.handleAuthentication();
      }, 50);
    }

    this.localAuthService.loginStateChange$.subscribe((state) => {
      this.loginState = state;
    });

  }
}

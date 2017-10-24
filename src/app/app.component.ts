import {Component, OnInit} from "@angular/core";
import {AuthLocalService} from "./auth-local.service";
import {Auth0AuthService} from "./auth0-auth.service";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginState: boolean;
  acSet: boolean = false;

  constructor(private localAuthService: AuthLocalService, private auth0service: Auth0AuthService, private userService: UserService) {
  }
  ngOnInit() {
    this.localAuthService.loginStateChange$.subscribe((state) => {
      this.loginState = state;

    });
    this.userService.acStateChange$.subscribe((acSet) => {
      this.acSet = acSet;
    });

    this.auth0service.isAuthenticated().then((blnAuthed) => {
      this.localAuthService.setLoginState(blnAuthed);
    });
  }
}

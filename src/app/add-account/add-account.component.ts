import {AfterViewInit, Component} from '@angular/core';
import {Auth0AuthService} from "../auth0-auth.service";


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements AfterViewInit {

  constructor(private auth0service: Auth0AuthService) {
  }

  ngAfterViewInit() {
    this.auth0service.isAuthenticated().then((bln) => {
      if (!bln) {
        this.auth0service.renderSigin();
      }
    });
  }

  tryLogin() {
    this.auth0service.login();
  }


}

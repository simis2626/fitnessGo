import {Component, OnInit} from '@angular/core';
import {Auth0AuthService} from "../auth0-auth.service";


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  constructor(private auth0service: Auth0AuthService) {
  }

  ngOnInit() {
  }

  tryLogin() {
    this.auth0service.login();
  }
}

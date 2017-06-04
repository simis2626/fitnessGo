import {Component, OnInit} from "@angular/core";
import {AuthLocalService} from "../auth-local.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public loginState: boolean = false;


  constructor(private localAuthService: AuthLocalService) {
  }


  ngOnInit() {
    this.localAuthService.userLoggedIn().then((result) => {
      this.loginState = result;
    });
    this.localAuthService.loginStateChange$.subscribe((state) => {
      this.loginState = state;
    });

  }


}

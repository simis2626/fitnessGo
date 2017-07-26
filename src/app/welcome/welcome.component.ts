import {Component, OnInit} from "@angular/core";
import {AuthLocalService} from "../auth-local.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public loginState: boolean = false;


  constructor(private localAuthService: AuthLocalService, private router: Router) {
  }


  ngOnInit() {
    this.localAuthService.userLoggedIn().then((result) => {
      this.loginState = result;
      setTimeout(() => {
        if (!this.loginState) {
          this.router.navigateByUrl('/welcome')
        }
      }, 3000);

    });
    this.localAuthService.loginStateChange$.subscribe((state) => {
      this.loginState = state;
      if (!this.loginState) {
        this.router.navigateByUrl('/welcome')
      }
    });

  }


}

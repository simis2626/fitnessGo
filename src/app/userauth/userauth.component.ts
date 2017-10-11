import {Component, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Auth0AuthService} from "../auth0-auth.service";
import {Router} from "@angular/router";
import {UserProfile} from "../Objects/UserProfile";

@Component({
  selector: 'app-userauth',
  templateUrl: './userauth.component.html',
  styleUrls: ['./userauth.component.css']
})
export class UserauthComponent implements OnInit {

  trustedImage: any;
  profile: UserProfile;

  constructor(private userService: UserService, private domSanit: DomSanitizer, private auth0Service: Auth0AuthService, private router: Router) {
  }

  ngOnInit() {
    this.auth0Service.isAuthenticated().then(() => {
      this.userService.getProfile().then((result) => {
        this.profile = result;
        if (this.profile) {
          this.trustedImage = this.domSanit.bypassSecurityTrustStyle("url('" + this.profile.picture + "')");
        }
      });
    });
  }

  triggerLogout() {
    this.auth0Service.logout();
    this.router.navigateByUrl('/welcome');


  }


}

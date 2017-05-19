import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-userauth',
  templateUrl: './userauth.component.html',
  styleUrls: ['./userauth.component.css']
})
export class UserauthComponent implements OnInit {

  constructor(private userService:UserService, private domSanit:DomSanitizer) { }

  ngOnInit() {
    this.userService.getProfile().then((result) => {this.profile = result
    this.domSanit.bypassSecurityTrustResourceUrl(this.profile.picture);

    });

  }

  profile: any;



}

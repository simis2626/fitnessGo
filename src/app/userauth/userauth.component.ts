import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-userauth',
  templateUrl: './userauth.component.html',
  styleUrls: ['./userauth.component.css']
})
export class UserauthComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getProfile().then((result) => this.profile = result);

  }

  profile: any;



}

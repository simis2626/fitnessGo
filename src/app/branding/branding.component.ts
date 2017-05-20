import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.css']
})
export class BrandingComponent implements OnInit {

  constructor() { }
  brandCaption:string = "Tracking your fitness is easy";
  ngOnInit() {
  }

}

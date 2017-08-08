import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.css', '../material-shared/shared-css.css']
})
export class BrandingComponent implements OnInit {

  constructor() { }
  brandCaption:string = "Tracking your fitness is easy";
  strImage: string;
  arrImages: string[];


  refreshImage() {
    let imageNum: number = Math.floor(Math.random() * 9);
    this.strImage = this.arrImages[imageNum];
    setInterval(() => {
      imageNum = Math.floor(Math.random() * 9 + 1);
      this.strImage = this.arrImages[imageNum];
    }, 12000);
  }



  ngOnInit() {
    this.arrImages = [];
    for (let i = 1; i < 10; i++) {
      this.arrImages.push("url('../../assets/" + i + ".jpg'");
    }
    this.refreshImage();








  }

}

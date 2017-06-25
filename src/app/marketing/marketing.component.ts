import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css', '../material-shared/shared-css.css']
})
export class MarketingComponent implements OnInit {
  public colnum:number;
  public rowheight:string;

  constructor() {
  }

  ngOnInit() {
    if(window.innerHeight < 910 || window.innerWidth < 760){
      this.colnum = 1;
      this.rowheight = '54%'
    }else{
      this.colnum = 3;
      this.rowheight = '100%';
    }
  }

}

import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css']
})
export class FABComponent implements OnInit {

  open: boolean = false;
  slideUp: boolean = false;

  constructor() {
  }

  ngOnInit() {

  }

  fabClicked() {
    this.open = !this.open;
    console.log("StateChange");
    setTimeout(() => {

      this.slideUp = !this.slideUp;
    }, 50)
  }

}

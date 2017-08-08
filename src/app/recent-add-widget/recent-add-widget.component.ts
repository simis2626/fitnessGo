import {Component, Input, OnInit} from '@angular/core';
import {Panel} from "../Objects/Panel";

@Component({
  selector: 'app-recent-add-widget',
  templateUrl: './recent-add-widget.component.html',
  styleUrls: ['./recent-add-widget.component.css']
})
export class RecentAddWidgetComponent implements OnInit {

  @Input() panel: Panel;

  constructor() {
  }

  ngOnInit() {


  }


}

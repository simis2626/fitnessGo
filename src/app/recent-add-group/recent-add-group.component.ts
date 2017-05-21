import {Component, OnInit} from "@angular/core";
import {Panel} from "../Objects/Panel";

@Component({
  selector: 'app-recent-add-group',
  templateUrl: './recent-add-group.component.html',
  styleUrls: ['./recent-add-group.component.css', '../material-shared/shared-css.css']
})
export class RecentAddGroupComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log("ng on init working");
    this.panels.push(new Panel(9877654456, 'Running', '&#xE566;', '#241E1B'));
    this.panels.push(new Panel(9877654457, 'Walking', '&#xE536;', '#241E1B'));
    this.panels.push(new Panel(9877654458, 'Biking', '&#xE52F;', '#241E1B'));
  }

  public panels: Panel[] = [];


}

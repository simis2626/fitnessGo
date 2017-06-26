import {Component, OnInit} from "@angular/core";
import {Panel} from "../Objects/Panel";
import {WorkoutsService} from "../workouts.service";

@Component({
  selector: 'app-recent-add-group',
  templateUrl: './recent-add-group.component.html',
  styleUrls: ['./recent-add-group.component.css', '../material-shared/shared-css.css']
})
export class RecentAddGroupComponent implements OnInit {

  constructor(private workoutService:WorkoutsService) {
  }

  ngOnInit() {
    this.workoutService.popularActivities(localStorage.getItem('id_sub')).then( (results) =>{
      this.panels.push(...results);
    })


  }

  public panels: Panel[] = [];


}

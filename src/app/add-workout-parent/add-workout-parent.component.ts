import { Component, OnInit } from '@angular/core';
import {ActivitiesService} from "../activities.service";
import {Activity} from "../Objects/Activity";
import {Workout} from "../Objects/Workout";
import {ActivityWO} from "../Objects/ActivityWO";

@Component({
  selector: 'app-add-workout-parent',
  templateUrl: './add-workout-parent.component.html',
  styleUrls: ['./add-workout-parent.component.css','../material-shared/shared-css.css']
})
export class AddWorkoutParentComponent implements OnInit {

  constructor(public activityService:ActivitiesService) { }
  public activitiesOpt:Activity[];

  workout:Workout;
  dirty:boolean = false;



  ngOnInit() {
    this.workout = new Workout(null,null,null,null,null);
    this.workout.activities = [];
    this.workout.activities.push(new ActivityWO(null,null,null,null,null,null,null,null));
    this.activityService.getActivityList()
      .then((results) => {
      this.activitiesOpt = results;
    });
  }


  setDirty(){
    this.dirty = true;
  }
}

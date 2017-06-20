import {Component, OnInit} from "@angular/core";
import {ActivitiesService} from "../activities.service";
import {Activity} from "../Objects/Activity";
import {Workout} from "../Objects/Workout";
import {ActivityWO} from "../Objects/ActivityWO";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {WorkoutsService} from "../workouts.service";


@Component({
  selector: 'app-add-workout-parent',
  templateUrl: './add-workout-parent.component.html',
  styleUrls: ['./add-workout-parent.component.css','../material-shared/shared-css.css']
})
export class AddWorkoutParentComponent implements OnInit {

  constructor(public activityService: ActivitiesService, public workoutService: WorkoutsService, public snackBar: MdSnackBar, private router: Router) {
  }
  public activitiesOpt:Activity[];

  workout:Workout;
  dirty:boolean = false;
  submitting: boolean = false;
  public savingText: string;


  ngOnInit() {
    this.workout = new Workout(localStorage.getItem('id_token'), null, new Date(), null, null);
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

  addActivity() {
    this.workout.activities.push(new ActivityWO(null, null, null, null, null, null, null, null))
  }

  rturn(ndx, item) {
    return ndx;
  }


  onSubmit() {
    this.savingText = "Saving...";
    this.submitting = true;

    new Promise((resolve, reject) => {
      this.workout.activities.map((act) => {
        act.date = this.workout.date;
      });
      resolve();

    }).then(() => {
      this.workoutService.addWorkout(this.workout).then((result) => {
          if (result) {
            this.savingText = "Done!";
            this.snackBar.open("Saved", null, {duration: 3000});
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 800);
          } else {
            this.submitting = false;
            this.snackBar.open("An error occurred. Try again.", null, {duration: 3000});
          }


        }
      );


    })

  }
}

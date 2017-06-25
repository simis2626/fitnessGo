import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {ActivitiesService} from "../activities.service";
import {Router} from "@angular/router";
import {Activity} from "../Objects/Activity";

@Component({
  selector: 'app-activityadd',
  templateUrl: './activityadd.component.html',
  styleUrls: ['./activityadd.component.css', '../material-shared/shared-css.css']
})
export class ActivityaddComponent implements OnInit {

  constructor(public snackBar: MdSnackBar, public activityService: ActivitiesService, private router: Router) {
  }

  dirty: boolean = false;
  submitting: boolean = false;
  public savingText: string;
  activity: Activity;
  private today: Date;
  public strCardio:string;


  @Output() actAdded = new EventEmitter();

  ngOnInit() {
    this.activity = new Activity(null,null);
  }


  setDirty() {
    this.dirty = true;
  }


  onSubmit() {
    this.activity.cardio = this.strCardio == "Cardio";
    this.activityService.addActivity(this.activity).then((result) => {
        if (result) {
          this.snackBar.open("Saved", null, {duration: 3000});
          this.actAdded.emit();
        } else {
          this.submitting = false;
          this.snackBar.open("An error occurred. Try again.", null, {duration: 3000});
        }


      }
    );
  }

}

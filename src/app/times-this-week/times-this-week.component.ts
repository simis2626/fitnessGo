import { Component, OnInit } from '@angular/core';
import {WorkoutsService} from "../workouts.service";
import {TargetWOService} from "../target-wo.service";
import {Workout} from "../Objects/Workout";
import {Target} from "../Objects/Target";

@Component({
  selector: 'app-times-this-week',
  templateUrl: './times-this-week.component.html',
  styleUrls: ['./times-this-week.component.css', '../material-shared/shared-css.css']
})
export class TimesThisWeekComponent implements OnInit {

  wrkouts:Workout[];
  trgt:Target;
  cnt:number;
  usrid:string;
  public progressValue:number;
  ready:boolean = false;
  public spincolor:string;


  constructor(private workoutService:WorkoutsService, private targetService:TargetWOService) { }

  ngOnInit() {
    this.usrid = localStorage.getItem('id_sub');
    Promise.all([
      this.targetService.getTarget(this.usrid),
      this.workoutService.workoutsThisWeek(this.usrid)
      ]).then((results) => {
      this.trgt = results[0];
      this.wrkouts = results[1];
      this.cnt = this.wrkouts.length;
      this.progressValue = Math.round((this.cnt/this.trgt.number) * 100);
      this.spincolor = this.progressValue > 99 ? "#0db721": "#5c8cac";

      this.ready = true;
    })


  }


}

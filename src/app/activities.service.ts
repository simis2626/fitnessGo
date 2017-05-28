import { Injectable } from '@angular/core';
import {Activity} from './Objects/Activity';

@Injectable()
export class ActivitiesService {

  private activities:Activity[];
  constructor() {
    this.activities = [];
    this.activities.push(new Activity(1234,'treadmill',true));
    this.activities.push(new Activity(1235,'bike',true));
    this.activities.push(new Activity(1236,'eleptical',true));
    this.activities.push(new Activity(1237,'rowing',true));
    this.activities.push(new Activity(1238,'bilateral rope pulldown',false));
    this.activities.push(new Activity(1239,'pushups',false));
    this.activities.push(new Activity(1249,'bird pees',false));
  }

  getActivityList():Promise<Activity[]>{
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve(this.activities);
      }, 2000);

    });
  }











}

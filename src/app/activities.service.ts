///<reference path="../../node_modules/rxjs/add/operator/map.d.ts"/>
import {Injectable} from "@angular/core";
import {Activity} from "./Objects/Activity";
import {Headers, Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ActivitiesService {

  private activities:Activity[];


  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.activities = [];
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});

  }

  private extractData(res) {
    let body = res.json();
    return body || {};
  }

  getActivityList():Promise<Activity[]>{
    return new Promise((resolve,reject) => {
      if (this.activities.length > 0) {
        resolve(this.activities);
      } else {
      this.http.get('/api/activity', this.options).map(this.extractData).subscribe((results) => {
        this.activities = results;
        resolve(results);
      });
      }

    });
  }

  addActivity(act:Activity):Promise<boolean>{

    return new Promise((resolve,reject) => {
    this.http.post('/api/activity',JSON.stringify(act),this.options).map(this.extractData).subscribe((results) => {
      if(results){
        if (this.activities.length>0){
          this.activities = [];
        }
        resolve(true);
      }else{
        resolve(false);
      }
    });
    });


  }











}

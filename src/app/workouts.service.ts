import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Workout} from "./Objects/Workout";
import {Panel} from "./Objects/Panel";

@Injectable()
export class WorkoutsService {

  headers: Headers;
  options: RequestOptions;
  thisWeekWorkouts: Workout[];
  graphData: any[];
  popularworkouts: Panel[];
  getsValid: boolean;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    this.options = new RequestOptions({headers: this.headers});

  }

  addWorkout(wrkout: Workout): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.http.post('/api/workout/', JSON.stringify(wrkout), this.options).map(this.extractData).subscribe((results) => {

        if (results) {
          this.getsValid = false;
          resolve(true);
        } else {
          resolve(false);
        }

      })


    })


  }

  workoutsThisWeek(_userid: string): Promise<Workout[]> {
    var dtNow = new Date();
    var dtMonday = new Date();
    var dtSunday = new Date();


    return new Promise((resolve, reject) => {
      if (this.getsValid && this.thisWeekWorkouts) {
        return resolve(this.thisWeekWorkouts);
      }
      dtMonday.setDate(dtNow.getDate());
      while (dtMonday.getDay() != 1) {
        dtMonday.setDate(dtMonday.getDate() - 1);
      }

      dtSunday.setDate(dtMonday.getDate() + 6);
      this.http.get('/api/workout/from/' + dtMonday.toISOString().substr(0, 10) + '/to/' + dtSunday.toISOString().substr(0, 10) + '/' + _userid, this.options).map(this.extractData)
        .subscribe((results) => {
          this.thisWeekWorkouts = results;
          this.getsValid = true;
          return resolve(results);
        });
    })
  }

  getDayGraphData(_userid: string): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this._getGraphData(_userid).then((result) => {
        return resolve(result.dayData)
      });

    });


  }

//cheesey
  getWeekGraphData(_userid: string): Promise<any[]> {

    return new Promise((resolve, reject) => {
      this._getGraphData(_userid).then((result) => {
        return resolve(result.weekData);
      });
    });


  }

  _getGraphData(_userid: string): Promise<any> {

    return new Promise((resolve, reject) => {
      if (this.getsValid && this.graphData) {
        return resolve(this.graphData);
      }

      this.http.get('/api/workout/hist/' + _userid + '/' + 5, this.options).map(this.extractData).subscribe((results) => {
        let milk = [];
        /*for (let i =0; i< results.length;i++){
          milk.push(new Panel(results[i]._id.id,results[i]._id.name));
        }*/
        milk = results[0];
        this.graphData = milk;
        this.getsValid = true;
        return resolve(milk);
      });


    });


  }

  popularActivities(_userid: string): Promise<Panel[]> {

    return new Promise((resolve, reject) => {
      if (this.getsValid && this.popularworkouts) {
        return resolve(this.popularworkouts);
      }

      this.http.get('/api/workout/activity/frequency/' + _userid, this.options).map(this.extractData).subscribe((results) => {
        let milk: Panel[] = [];
        for (let i = 0; i < results.length; i++) {
          milk.push(new Panel(results[i]._id.id, results[i]._id.name));
        }
        this.popularworkouts = milk;
        this.getsValid = true;
        return resolve(milk);
      });


    });


  }

  private extractData(res) {
    let body = res.json();
    return body || {};
  }


}

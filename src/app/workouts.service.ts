import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Workout} from "./Objects/Workout";
import {Panel} from "./Objects/Panel";

@Injectable()
export class WorkoutsService {

  headers: Headers;
  options: RequestOptions;
  thisWeekWorkouts: Workout[];
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});

  }

  popularworkouts: Panel[];
  getsValid: boolean;

  private extractData(res) {
    let body = res.json();
    return body || {};
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

  workoutsThisWeek(_userid:string):Promise<Workout[]>{
    var dtNow = new Date();
    var dtMonday = new Date();
    var dtSunday = new Date();



    return new Promise((resolve,reject) => {
      if (this.getsValid && this.thisWeekWorkouts) {
        resolve(this.thisWeekWorkouts);
      }
      dtMonday.setDate(dtNow.getDate());
      while (dtMonday.getDay() != 1){
         dtMonday.setDate(dtMonday.getDate() - 1);
      }

      dtSunday.setDate(dtMonday.getDate() + 6);
      console.log(dtMonday.toISOString().substr(0,10), dtSunday.toISOString().substr(0,10));
      this.http.post('/api/workout/from/' + dtMonday.toISOString().substr(0,10) + '/to/' + dtSunday.toISOString().substr(0,10), {_userid:_userid},this.options).map(this.extractData)
        .subscribe((results) => {
          console.log(dtMonday);
          this.thisWeekWorkouts = results;
          this.getsValid = true;
          resolve(results);
        });
    })
}

  popularActivities(_userid:string):Promise<Panel[]>{

    return new Promise((resolve,reject) => {
      if (this.getsValid && this.popularworkouts) {
        resolve(this.popularworkouts);
      }

      this.http.get('/api/workout/activity/frequency/' + _userid, this.options).map(this.extractData).subscribe( (results) =>{
        let milk:Panel[] = [];
        for (let i =0; i< results.length;i++){
          milk.push(new Panel(results[i]._id.id,results[i]._id.name));
        }
        this.popularworkouts = milk;
        this.getsValid = true;
        resolve(milk);
      });





    });




  }



}

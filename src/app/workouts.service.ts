import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Workout} from "./Objects/Workout";

@Injectable()
export class WorkoutsService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});

  }

  private extractData(res) {
    let body = res.json();
    return body || {};
  }


  addWorkout(wrkout: Workout): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.http.post('/api/workout/', JSON.stringify(wrkout), this.options).map(this.extractData).subscribe((results) => {

        if (results) {
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
      dtMonday.setDate(dtNow.getDate());
      while (dtMonday.getDay() != 1){
         dtMonday.setDate(dtMonday.getDate() - 1);
      }

      dtSunday.setDate(dtMonday.getDate() + 6);
      console.log(dtMonday.toISOString().substr(0,10), dtSunday.toISOString().substr(0,10));
      this.http.post('/api/workout/from/' + dtMonday.toISOString().substr(0,10) + '/to/' + dtSunday.toISOString().substr(0,10), {_userid:_userid},this.options).map(this.extractData)
        .subscribe((results) => {
          console.log(dtMonday);
          resolve(results);
        });
    })
}



}

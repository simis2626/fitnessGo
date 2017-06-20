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



}

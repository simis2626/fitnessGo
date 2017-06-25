import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Target} from "./Objects/Target";

@Injectable()
export class TargetWOService {

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


  changeTarget(target: Target): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.http.post('/api/targetwo/', JSON.stringify(target), this.options).map(this.extractData).subscribe((results) => {

        if (results) {
          resolve(true);
        } else {
          resolve(false);
        }

      })


    });


  }

  getTarget(_userId: string): Promise<Target> {
    return new Promise((resolve, reject) => {

      this.http.get('/api/targetwo/' + _userId).map(this.extractData).subscribe((results) => {
          resolve(results[0]);
        }
      )
    })

  }

}

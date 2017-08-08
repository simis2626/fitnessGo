import {Injectable} from "@angular/core";
import {WeighIn} from "./Objects/WeighIn";
import {Headers, Http, RequestOptions} from "@angular/http";

@Injectable()
export class WeighInService {
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


  addWeighin(weighin: WeighIn): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.http.post('/api/weighin/', JSON.stringify(weighin), this.options).map(this.extractData).subscribe((results) => {

        if (results) {
          resolve(true);
        } else {
          resolve(false);
        }

      })


    });


  }


}

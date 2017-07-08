import {Component, OnInit} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-fitbit-success',
  templateUrl: './fitbit-success.component.html',
  styleUrls: ['./fitbit-success.component.css']
})
export class FitbitSuccessComponent implements OnInit {

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.keys);
    this.storeFitbitAuth(this.route.snapshot.paramMap.get('code'));
    setTimeout(() => {
      console.log(this.route);
      console.log(this.route.params);
      console.log(this.route.snapshot.params);
    })
  }

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http, private route: ActivatedRoute) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});

  }

  private extractData(res) {
    let body = res.json();
    return body || {};
  }

  storeFitbitAuth(code: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.http.post('/api/fitbit', JSON.stringify({
        'code': code,
        '_userid': localStorage.getItem('id_sub')
      }), this.options).map(this.extractData).subscribe((results) => {
        if (results) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });


  }











}

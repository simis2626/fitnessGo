import {Component, OnInit} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-fitbit-success',
  templateUrl: './fitbit-success.component.html',
  styleUrls: ['./fitbit-success.component.css']
})
export class FitbitSuccessComponent implements OnInit {

  code: any;
  sub: any;
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http, private route: ActivatedRoute) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});

  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.code = params['code'] || '0';
        if (this.code != '0') {
          this.storeFitbitAuth(this.code);
        }
      });

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

  private extractData(res) {
    let body = res.json();
    return body || {};
  }


}

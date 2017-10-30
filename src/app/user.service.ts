import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {UserProfile} from "./Objects/UserProfile";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  headers: Headers;
  options: RequestOptions;
  userProfile: UserProfile;
  acSet: boolean = false;


  public ACStateChange = new Subject<boolean>();
  acStateChange$ = this.ACStateChange.asObservable();




  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    this.options = new RequestOptions({headers: this.headers});

  }

  saveUser(user): Promise<boolean> {

    return new Promise((resolve, reject) => {
      const access_token = localStorage.getItem('access_token');
      console.log(access_token);
      if (access_token == null) {
        let tmpheaders = new Headers();
        tmpheaders.append('Content-Type', 'application/json');
        tmpheaders.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        let tmpoptions = new RequestOptions({headers: tmpheaders});
          this.http.post('/api/user/', JSON.stringify(user), tmpoptions).map(this.extractData).subscribe((results) => {
            if (results) {
              localStorage.setItem('access_token', results.access_token);
              this.acSet = true;
              this.ACStateChange.next(true);
              resolve(true);
            } else {
              resolve(false);
            }

          });


      } else {
        this.acSet = true;
        this.ACStateChange.next(true);
        resolve(true)
      }
      }
    );
  }


  public getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userProfile) {
        localStorage.setItem('fitnessProfile', JSON.stringify(this.userProfile));

        resolve(this.userProfile);
      } else {
        this.userProfile = JSON.parse(localStorage.getItem('fitnessProfile'));
        resolve(this.userProfile);
      }
    });
  }


  public receiveProfile(profile: any): void {

    this.userProfile = new UserProfile(14, '', '', '', '', '');
    this.saveUser(this.userProfile);

  }

  private extractData(res) {
    let body = res.json();
    return body || {};
  }


  public getTaxInfo():Promise<any>{
      return new Promise((resolve, reject) => {
        this.http.get('/api/tax/groupBy/day', this.options).map(this.extractData).subscribe((results) => {
          resolve(results);
        });


    });


  }


  public saveTax(tax: any): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.http.post('/api/tax/', JSON.stringify(tax), this.options).map(this.extractData).subscribe((results) => {

        if (results) {
          resolve(true);
        } else {
          resolve(false);
        }

      })


    });


  }


}

import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {TaxTrans} from "./Objects/Taxtrans";

@Injectable()
export class UserService {

  headers: Headers;
  options: RequestOptions;
  userProfile: any;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});

  }

  saveUser(user): Promise<boolean> {
    user._userid = localStorage.getItem('id_sub');
    return new Promise((resolve, reject) => {

      this.http.post('/api/user/', JSON.stringify(user), this.options).map(this.extractData).subscribe((results) => {

        if (results) {
          resolve(true);
        } else {
          resolve(false);
        }

      })


    });


  }

  public getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userProfile) {
        localStorage.setItem('fitnessProfile', JSON.stringify(this.userProfile));
        this.saveUser(this.userProfile);
        resolve(this.userProfile);
      } else {
        this.userProfile = JSON.parse(localStorage.getItem('fitnessProfile'));
        this.saveUser(this.userProfile);
        resolve(this.userProfile);
      }
    });
  }

  public getRemoteProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    cb();
  }

  public receiveProfile(profile: any): void {
    this.userProfile = profile;

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
  public saveTax(tax:TaxTrans): Promise<boolean> {
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

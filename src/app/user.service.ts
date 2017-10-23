import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {UserProfile} from "./Objects/UserProfile";

@Injectable()
export class UserService {

  headers: Headers;
  options: RequestOptions;
  userProfile: UserProfile;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    this.options = new RequestOptions({headers: this.headers});

  }

  saveUser(user): Promise<boolean> {
    let tmpheaders = new Headers();
    tmpheaders.append('Content-Type', 'application/json');
    tmpheaders.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    let tmpoptions = new RequestOptions({headers: tmpheaders});
    //user._userid = localStorage.getItem('id_sub');
    return new Promise((resolve, reject) => {
        if (localStorage.getItem('id_token') != 'null') {
          this.http.post('/api/user/', JSON.stringify(user), tmpoptions).map(this.extractData).subscribe((results) => {

            if (results) {
              resolve(true);
            } else {
              resolve(false);
            }

          });


        } else {
          let timer = setInterval(() => {
            if (localStorage.getItem('id_token') != 'null') {
              clearInterval(timer);
              this.http.post('/api/user/', JSON.stringify(user), tmpoptions).map(this.extractData).subscribe((results) => {

                if (results) {
                  resolve(true);
                } else {
                  resolve(false);
                }

              });
            }
          }, 200)
        }

      }
    );


  }

  public getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userProfile) {
        localStorage.setItem('fitnessProfile', JSON.stringify(this.userProfile));

        //TODO:Remove this comment
        //this.saveUser(this.userProfile);
        resolve(this.userProfile);
      } else {
        this.userProfile = JSON.parse(localStorage.getItem('fitnessProfile'));
        //this.saveUser(this.userProfile);
        resolve(this.userProfile);
      }
    });
  }


  public receiveProfile(profile: any): void {

    this.userProfile = new UserProfile(profile.getId(), profile.getName(), profile.getGivenName(), profile.getImageUrl(), profile.getEmail(), profile.getFamilyName());


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

import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";


@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.css']
})
export class TaxFormComponent implements OnInit {

  constructor(private userService:UserService) { }
    ready = false;
    i =0;
    model:any = [];
    
    data:any;
    
    
  ngOnInit() {
      this.userService.getTaxInfo().then((results) => {
          this.data = results;
          this.data.forEach( (obj) =>{
              this.model.push(obj);
          })
          this.ready = true;
      });
  }

}

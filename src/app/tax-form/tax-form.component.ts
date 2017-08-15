import {Component, OnInit} from '@angular/core';
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
  toSave: any = [];
    data:any;


  ngOnInit() {
      this.userService.getTaxInfo().then((results) => {
          this.data = results;
          this.data.forEach( (obj) =>{
            obj.claim = obj.claim ? obj.claim : false;
              this.model.push(obj);
          });
          this.ready = true;
      });
  }

  saveToSave() {
    if (this.toSave.length > 0) {
      this.userService.saveTax(this.toSave).then((results) => {
          console.log(results);
          if (results) {
            this.toSave = [];
            return;
          } else {
            this.saveToSave();
            return;
          }
        }
      );
    }

  }





  nextOne(){
      this.i = this.i +1;
  }

  prevOne() {
    this.i = this.i - 1;
  }

  toggleClaim(i, ndx) {
    this.model[i].claim[ndx] = !this.model[i].claim[ndx];

    const ndxSaved = this.toSave.findIndex(function (obj) {
      return obj._id == this.model[i].id[ndx];
    }, this);

    if (ndxSaved < 0) {
      this.toSave.push({
        '_id': this.model[i].id[ndx],
        'claim': this.model[i].claim[i],
        'note': this.model[i].note[ndx]
      });
    } else {
      this.toSave[ndxSaved].claim = this.model[i].claim[ndx];
    }

  }


  hideAndSave(i, ndx) {
    const noteInput = document.getElementById('note' + i + ndx);
    const inputInput = document.getElementById('input' + i + ndx);
    const noteButton = document.getElementById('button' + i + ndx);
    console.log('triggered');
    noteInput.style.display = 'none';
    noteButton.style.display = 'block';
    noteButton.innerHTML = 'SAVED';
    const ndxSaved = this.toSave.findIndex(function (obj) {
      return obj._id == this.model[i].id[ndx];
    }, this);

    if (ndxSaved < 0) {
      this.toSave.push({
        '_id': this.model[i].id[ndx],
        'claim': this.model[i].claim[i],
        'note': this.model[i].note[ndx]
      });
    } else {
      this.toSave[ndxSaved].note = this.model[i].note[ndx];
    }

  }


  triggerNote(i, ndx) {
    const noteInput = document.getElementById('note' + i + ndx);
    const inputInput = document.getElementById('input' + i + ndx);
    noteInput.style.display = 'block';
    inputInput.focus();
    const noteButton = document.getElementById('button' + i + ndx);
    noteButton.style.display = 'none';
  }

}

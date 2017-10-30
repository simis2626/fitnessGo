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
    ready2 = true;
    i =0;
  searchText;
    model:any = [];
  toSave: any = [];
    data:any;
  deductions: string;


  ngOnInit() {
      this.userService.getTaxInfo().then((results) => {
          this.data = results;
          this.data.forEach( (obj) =>{
            obj.claim = obj.claim ? obj.claim : false;
              this.model.push(obj);
          });
        this.i = parseInt(localStorage.getItem('Fitness-app-tax')) || 0;
          this.ready = true;
        this.setDeduction();



      });
  }
  saveHide(){
  this.ready2 = false;
    this.saveToSave();

  }

  setDeduction() {
    setTimeout(() => {
      let numLong = (-1 * this.model.reduce(function (total, obj) {
        var smlArr = [];
        for (let i = 0; i < obj.id.length; i++) {
          smlArr.push({'claim': obj.claim[i], 'cost': obj.Cost[i]});
        }
        return total + smlArr.reduce(function (totalsml, smlObj) {
          return smlObj.claim ? totalsml + smlObj.cost : totalsml;
        }, 0);
      }, 0));

      let decIndex = numLong.toString().indexOf('.', 0);
      this.deductions = numLong.toString().substr(0, decIndex + 3);

    }, 80);


  }

//wqikjhw
  saveToSave() {
    if (this.toSave.length > 0) {
      this.userService.saveTax(this.toSave).then((results) => {
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

  changeI(i, dir): number {
    const upper = 358;
    const lower = 0;
    if (dir == "inc") {
      return i < 358 ? i + 1 : 358;
    } else if (dir == "dec") {
      return i > 0 ? i - 1 : 0;
    }


  }

//358 and 0

  nextOne(){
    this.ready2 = false;
    this.i = this.changeI(this.i, 'inc');
    this.saveToSave();
    this.ready2 = true;
    localStorage.setItem('Fitness-app-tax', this.i.toString());
  }

  prevOne() {
    this.ready2 = false;
    this.i = this.changeI(this.i, 'dec');
    this.saveToSave();
    this.ready2 = true;
    localStorage.setItem('Fitness-app-tax', this.i.toString());
  }

  toggleClaim(i, ndx) {
    this.model[i].claim[ndx] = !this.model[i].claim[ndx];
    this.setDeduction();
    const ndxSaved = this.toSave.findIndex(function (obj) {
      return obj._id == this.model[i].id[ndx];
    }, this);
    if (ndxSaved < 0) {
      this.toSave.push({
        '_id': this.model[i].id[ndx],
        'claim': this.model[i].claim[ndx],
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
    noteInput.style.display = 'none';
    noteButton.style.display = 'block';
    noteButton.innerHTML = 'SAVED';
    const ndxSaved = this.toSave.findIndex(function (obj) {
      return obj._id == this.model[i].id[ndx];
    }, this);

    if (ndxSaved < 0) {
      this.toSave.push({
        '_id': this.model[i].id[ndx],
        'claim': this.model[i].claim[ndx],
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

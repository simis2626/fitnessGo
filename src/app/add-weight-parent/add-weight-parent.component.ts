import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {WeighIn} from "../Objects/WeighIn";

@Component({
  selector: 'app-add-weight-parent',
  templateUrl: './add-weight-parent.component.html',
  styleUrls: ['./add-weight-parent.component.css']
})
export class AddWeightParentComponent implements OnInit {

  constructor(public snackBar: MdSnackBar, private router: Router) {
  }

  dirty: boolean = false;
  submitting: boolean = false;
  public savingText: string;
  times: string[];
  weighIn: WeighIn;
  private today: Date;

  ngOnInit() {
    this.today = new Date();
    this.weighIn = new WeighIn(null, localStorage.getItem('id_token'), this.today, null, null);
    this.times = ["Morning", "Day", "Night"];
  }


  setDirty() {
    this.dirty = true;
  }


  onSubmit() {
    this.savingText = "Saving...";
    this.submitting = true;
    setTimeout(() => {
      this.savingText = "Done!";
      this.snackBar.open("Saved", null, {duration: 3000});
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 1500);


    }, 4000);
  }

}

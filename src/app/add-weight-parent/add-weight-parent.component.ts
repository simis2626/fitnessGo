import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {WeighIn} from "../Objects/WeighIn";
import {WeighInService} from "../weigh-in.service";

@Component({
  selector: 'app-add-weight-parent',
  templateUrl: './add-weight-parent.component.html',
  styleUrls: ['./add-weight-parent.component.css', '../material-shared/shared-css.css']
})
export class AddWeightParentComponent implements OnInit {

  constructor(public snackBar: MdSnackBar, public weighinService: WeighInService, private router: Router) {
  }

  dirty: boolean = false;
  submitting: boolean = false;
  public savingText: string;
  times: string[];
  weighIn: WeighIn;
  private today: Date;

  ngOnInit() {
    this.today = new Date();
    this.weighIn = new WeighIn(localStorage.getItem('id_token'), this.today, null, null);
    this.times = ["Morning", "Day", "Night"];
  }


  setDirty() {
    this.dirty = true;
  }


  onSubmit() {
    this.savingText = "Saving...";
    this.submitting = true;
    this.weighinService.addWeighin(this.weighIn).then((result) => {
        if (result) {
          this.savingText = "Done!";
          this.snackBar.open("Saved", null, {duration: 3000});
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 800);
        } else {
          this.submitting = false;
          this.snackBar.open("An error occurred. Try again.", null, {duration: 3000});
        }


      }
    );
  }

}

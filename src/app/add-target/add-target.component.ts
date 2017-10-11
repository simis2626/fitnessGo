import {AfterViewInit, Component, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {TargetWOService} from "../target-wo.service";
import {Router} from "@angular/router";
import {Target} from "../Objects/Target";

@Component({
  selector: 'app-add-target',
  templateUrl: './add-target.component.html',
  styleUrls: ['./add-target.component.css', '../material-shared/shared-css.css']
})
export class AddTargetComponent implements OnInit, AfterViewInit {

  dirty: boolean = false;
  submitting: boolean = false;
  public savingText: string;
  target: Target;
  private today: Date;

  constructor(public snackBar: MatSnackBar, public targetService: TargetWOService, private router: Router) {
  }

  ngOnInit() {
    this.today = new Date();
    this.target = new Target(null, localStorage.getItem('id_sub'), this.today);


  }


  ngAfterViewInit() {
    window.scroll(0, 0);

  }


  setDirty() {
    this.dirty = true;
  }


  onSubmit() {
    this.savingText = "Saving...";
    this.submitting = true;
    this.targetService.changeTarget(this.target).then((result) => {
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

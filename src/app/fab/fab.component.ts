import {Component, OnInit} from "@angular/core";
import {Panel} from "../Objects/Panel";
import {WorkoutsService} from "../workouts.service";


@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css']
})
export class FABComponent implements OnInit {

  open: boolean = false;
  slideUp: boolean = false;
  panel:Panel[] = [];
 ready:boolean;
  constructor(private workoutService:WorkoutsService) {
  }

  ngOnInit() {
      this.workoutService.popularActivities(localStorage.getItem('id_sub')).then((results) => {
      this.panel.push(...results);
      this.ready = true;
    });

  }

  fabClicked() {
    this.open = !this.open;
    setTimeout(() => {

      this.slideUp = !this.slideUp;
    }, 50)
  }

}

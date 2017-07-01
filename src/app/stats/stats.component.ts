import {Component, OnInit} from "@angular/core";
import {ActivitiesService} from "../activities.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private activityService: ActivitiesService) {
  }

  weightStats: any;
  activitylist: any[];
  selectedActivity: string;

  ngOnInit() {
    this.activitylist = [];
    this.activityService.getStats(localStorage.getItem('id_sub')).then((weightStats) => {

      this.weightStats = weightStats[0];
      for (let i = 0; i < this.weightStats.personalBests.length; i++) {
        this.activitylist.push(this.weightStats.personalBests[i]._id.name);
      }
    });

  }


  populateTable() {
    console.log("trigger");
  }

}

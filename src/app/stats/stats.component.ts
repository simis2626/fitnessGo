import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivitiesService} from "../activities.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css', '../material-shared/shared-css.css']
})
export class StatsComponent implements OnInit, AfterViewInit {

  constructor(private activityService: ActivitiesService) {
  }

ngAfterViewInit() {
    window.scroll(0, 0);

  }

    selectedCardio:boolean;
  weightStats: any;
  activitylist: any[];
  activityCardio: any[];
  selectedActivity: string;
  tableStructure: any[];
  realTableStructure: any[];

  ngOnInit() {
    this.activitylist = [];

    this.activityCardio = [];
    this.activityService.getStats(localStorage.getItem('id_sub')).then((weightStats) => {

      this.weightStats = weightStats[0];
      for (let i = 0; i < this.weightStats.activityNames.length; i++) {
        this.activitylist.push(this.weightStats.activityNames[i]._id.name);
        this.activityCardio.push(this.weightStats.activityNames[i]._id.cardio);
      }
    });

  }


  populateTable() {
    let compFunction = function (a, b) {
      if (a._id.weight > b._id.weight) {
        return 1;
      } else if (a._id.weight < b._id.weight) {
        return -1;
      }
      return 0;
    };

    let compFunction2 = function (a, b) {
      if (a._id.duration > b._id.duration) {
        return 1;
      } else if (a._id.duration < b._id.duration) {
        return -1;
      }
      return 0;
    };


    this.realTableStructure = null;
    this.selectedCardio = this.activityCardio[this.activitylist.indexOf(this.selectedActivity)];

    if (!this.selectedCardio) {


      this.tableStructure = [];
      let filteredPBArray = this.weightStats.personalBests.filter(function (act) {
        return act._id.name == this.selectedActivity;
      }, this);
      let filteredRecentArray = this.weightStats.mostRecent.filter(function (act) {
        return act._id.name == this.selectedActivity;
      }, this);

      filteredPBArray.sort(compFunction);
      filteredRecentArray.sort(compFunction);

      let tempArray: any[];
      for (let weight of filteredPBArray) {
        tempArray = [];
        tempArray.push(weight._id.weight + 'kg');
        tempArray.push(weight.PbReps);
        this.tableStructure.push(tempArray);
      }
      let value = 0;
      for (let weight of filteredRecentArray) {
        this.tableStructure[value].push(weight.reps + '<br>' + new Date(weight.mostRecent).toDateString());
        value++;
      }

      this.realTableStructure = this.tableStructure;
    } else {
      this.tableStructure = [];
      let filteredPBArray = this.weightStats.personalBestsCardio.filter(function (act) {
        return act._id.name == this.selectedActivity;
      }, this);
      let filteredRecentArray = this.weightStats.mostRecentCardio.filter(function (act) {
        return act._id.name == this.selectedActivity;
      }, this);

      filteredPBArray.sort(compFunction2);
      filteredRecentArray.sort(compFunction2);

      let tempArray: any[];
      for (let duration of filteredPBArray) {
        tempArray = [];
        tempArray.push(duration._id.duration + ' - ' + duration + 2 + ' min');
        tempArray.push(duration.distance + 'm');
        this.tableStructure.push(tempArray);
      }
      let value = 0;
      for (let duration of filteredRecentArray) {
        this.tableStructure[value].push(duration.distance + 'm<br>' + new Date(duration.mostRecent).toDateString());
        value++;
      }

      this.realTableStructure = this.tableStructure;
    }
  }





















  }



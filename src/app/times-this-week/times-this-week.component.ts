import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {WorkoutsService} from "../workouts.service";
import {TargetWOService} from "../target-wo.service";
import {Workout} from "../Objects/Workout";
import {Target} from "../Objects/Target";


declare var Plotly: any;


@Component({
  selector: 'app-times-this-week',
  templateUrl: './times-this-week.component.html',
  styleUrls: ['./times-this-week.component.css', '../material-shared/shared-css.css']
})
export class TimesThisWeekComponent implements OnInit, AfterViewInit {

  wrkouts: Workout[];
  trgt: Target;
  cnt: number;
  dayData: any[];
  usrid: string;
  public progressValue: number;
  ready: boolean = false;
  public spincolor: string;
  @ViewChild('dayGraph') dayGraph: ElementRef;
  constructor(private workoutService: WorkoutsService, private targetService: TargetWOService) {
  }

  ngOnInit() {
    this.usrid = localStorage.getItem('id_sub');
    Promise.all([
      this.targetService.getTarget(this.usrid),
      this.workoutService.workoutsThisWeek(this.usrid),
    ]).then((results) => {
      this.trgt = results[0];
      this.wrkouts = results[1];
      this.cnt = this.wrkouts.length;
      this.progressValue = Math.round((this.cnt / this.trgt.number) * 100);
      this.spincolor = this.progressValue > 99 ? "#0db721" : "#5c8cac";
      this.ready = true;


    });


  }

  ngAfterViewInit() {
    let getDay = function (intDay: number) {


      let day: string;
      switch (intDay) {


        case 1: {//next
          day = 'Mon';
          break;
        }
        case 2: {
          day = 'Tue';
          break;
        }
        case 3: {
          day = 'Wed';
          break;
        }
        case 4: {
          day = 'Thu';
          break;
        }
        case 5: {
          day = 'Fri';
          break;
        }
        case 6: { //prev
          day = 'Sat';
          break;
        }
        case 7: {
          day = 'Sun';
          break;
        }
      }
      return day;
    };


    this.workoutService.getDayGraphData(this.usrid).then((results) => {
      this.dayData = results;
      let data = [{
        x: [],
        y: [],
        marker: {color: []},
        type: 'bar'
      }];
      data[0].x = [];
      data[0].y = [];
      data[0].marker.color = [];

      let prevDayOfWeek: number;
      let prevDayOfYear: number = this.dayData[0]._id.dayOfYear - 1;
      let count: number = 1;

      this.dayData.forEach((obj) => {

        while (obj._id.dayOfYear > (prevDayOfYear + 1) ) {
          let day2: string = getDay(prevDayOfWeek == 7 ? 1 : (prevDayOfWeek + 1));
          data[0].x.push('Skipped' + ' - ' + day2);
          data[0].y.push(0);
          data[0].marker.color.push('red');
          count++;
          prevDayOfWeek = (prevDayOfWeek == 7 ? 1: (prevDayOfWeek +1));
          prevDayOfYear++;
        }


        let marker = obj.stretchesBool ? 'green' : 'orange';
        let dateObj = new Date(obj._id.date);
        let dayDate = dateObj.getDate();
        let monthDate = dateObj.getMonth() + 1;
        let day = getDay(obj._id.dayOfWeek);
        data[0].x.push(dayDate + '/' + monthDate + ' - ' + day);
        data[0].y.push(obj.duration);
        data[0].marker.color.push(marker);
        prevDayOfWeek = obj._id.dayOfWeek;
        prevDayOfYear = obj._id.dayOfYear;
        count++;
      });
      let layout = {
        title: 'Workout time each day',
        font: {
          family: 'Raleway, sans-serif'
        },
        showlegend: false,
        xaxis: {
          tickangle: -45
        },
        bargap:0.05,
        autosize:false,
        height:233,
        width:window.innerWidth<700 ? window.innerWidth : 700

      };
      let timer = setInterval(() => {
        if (this.ready) {
        Plotly.newPlot(this.dayGraph.nativeElement, data, layout, {displayModeBar: false});
          clearInterval(timer);
        }
      }, 30);


    });
  }


  getColor() {
    if (this.progressValue < 33) {
      return 'red';
    } else if (this.progressValue >= 33 && this.progressValue < 66) {
      return 'orange';
    } else if (this.progressValue >= 66 && this.progressValue < 90) {
      return 'rgb(230,250,52)';
    } else {
      return 'green';
    }


  }



}

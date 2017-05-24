import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-times-this-week',
  templateUrl: './times-this-week.component.html',
  styleUrls: ['./times-this-week.component.css', '../material-shared/shared-css.css']
})
export class TimesThisWeekComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public progressValue:number = 50;
}

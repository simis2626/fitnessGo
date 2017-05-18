import { Component} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  tiles = [
    {text:'1', cols: 2,rows:1 ,color:'lightblue'},
    {text:'2', cols: 1,rows:2 ,color:'lightgreen'},
    {text:'3', cols: 3,rows:1 ,color:'lightpink'},
    {text:'4', cols: 1,rows:1 ,color:'red'},
    {text:'5', cols: 2,rows:1 ,color:'blue'}

  ];

}

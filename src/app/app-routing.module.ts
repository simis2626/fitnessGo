import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {AddWorkoutParentComponent} from './add-workout-parent/add-workout-parent.component';

const routes: Routes = [
  {
    path: 'workout/add',
    component: AddWorkoutParentComponent
  },
  {
    path: '',
    component:WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AddWorkoutParentComponent} from "./add-workout-parent/add-workout-parent.component";
import {AddWeightParentComponent} from "./add-weight-parent/add-weight-parent.component";
const routes: Routes = [
  {
    path: 'workout/add',
    component: AddWorkoutParentComponent
  },
  {
    path: 'weigh-in/add',
    component: AddWeightParentComponent
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

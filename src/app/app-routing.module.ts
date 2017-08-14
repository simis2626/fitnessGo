import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AddWorkoutParentComponent} from "./add-workout-parent/add-workout-parent.component";
import {AddWeightParentComponent} from "./add-weight-parent/add-weight-parent.component";
import {AddTargetComponent} from "./add-target/add-target.component";
import {StatsComponent} from "./stats/stats.component";
import {FitbitSuccessComponent} from "./fitbit-success/fitbit-success.component";
import {MarketingComponent} from "./marketing/marketing.component";
import {TaxFormComponent} from "./tax-form/tax-form.component";

const routes: Routes = [
  {
    path: 'target/add',
    component: AddTargetComponent
  },
  {
    path: 'workout/add',
    component: AddWorkoutParentComponent
  }, {
    path: 'fitbit_success',
    component: FitbitSuccessComponent
  },
  {
    path: 'weigh-in/add',
    component: AddWeightParentComponent
  },
  {
    path: 'activity/stats',
    component: StatsComponent
  },
  {
    path: 'welcome',
    component: MarketingComponent
  },
  {
    path: 'tax',
    component: TaxFormComponent
  },
  {
    path: '',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

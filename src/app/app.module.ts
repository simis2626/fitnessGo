import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { WelcomeComponent } from './welcome/welcome.component';
import {MaterialSharedModule} from "./material-shared/material-shared.module";
import { UserauthComponent } from './userauth/userauth.component';
import { BrandingComponent } from './branding/branding.component';
import { ReportWidgetComponent } from './report-widget/report-widget.component';
import { FABComponent } from './fab/fab.component';
import { TimesThisWeekComponent } from './times-this-week/times-this-week.component';
import { RecentAddWidgetComponent } from './recent-add-widget/recent-add-widget.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AuthLocalService } from './auth-local.service';
import { Auth0AuthService } from './auth0-auth.service';
import {UserService} from './user.service';
import { RecentAddGroupComponent } from './recent-add-group/recent-add-group.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UserauthComponent,
    BrandingComponent,
    ReportWidgetComponent,
    FABComponent,
    TimesThisWeekComponent,
    RecentAddWidgetComponent,
    AddAccountComponent,
    RecentAddGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule
  ],
  providers: [AuthLocalService, Auth0AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDatepickerModule,
  MdGridListModule,
  MdInputModule,
  MdMenuModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdInputModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdMenuModule
  ],
  exports: [
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdInputModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdMenuModule
  ],
  declarations: []
})
export class MaterialSharedModule { }

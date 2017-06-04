import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDatepickerModule,
  MdGridListModule,
  MdInputModule,
  MdNativeDateModule,
  MdProgressSpinnerModule,
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
    MdProgressSpinnerModule,
    MdSelectModule,
    MdInputModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],
  exports: [
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdToolbarModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdInputModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],
  declarations: []
})
export class MaterialSharedModule { }

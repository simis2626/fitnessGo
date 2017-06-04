import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdGridListModule,
  MdInputModule,
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
    MdSnackBarModule
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
    MdSnackBarModule
  ],
  declarations: []
})
export class MaterialSharedModule { }

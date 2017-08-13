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
  MdToolbarModule,
  MdChipsModule
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
    MdMenuModule,
    MdChipsModule
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
    MdMenuModule,
    MdChipsModule
  ],
  declarations: []
})
export class MaterialSharedModule {
}

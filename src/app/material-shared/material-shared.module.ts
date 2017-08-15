import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdGridListModule,
  MdInputModule,
  MdListModule,
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
    MdMenuModule,
    MdChipsModule,
    MdListModule,
    MdDialogModule
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
    MdChipsModule,
    MdListModule,
    MdDialogModule
  ],
  declarations: []
})
export class MaterialSharedModule {
}

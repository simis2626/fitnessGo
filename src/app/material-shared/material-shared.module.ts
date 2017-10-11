import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatChipsModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatChipsModule,
    MatListModule,
    MatDialogModule
  ],
  declarations: []
})
export class MaterialSharedModule {
}

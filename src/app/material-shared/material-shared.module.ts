import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MdGridListModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdToolbarModule,
    MdButtonModule,
    MdProgressSpinnerModule
  ],
  exports: [
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdToolbarModule,
    MdButtonModule,
    MdProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialSharedModule { }

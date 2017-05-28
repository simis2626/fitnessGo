import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MdGridListModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdInputModule} from '@angular/material';



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
    MdInputModule
  ],
  exports: [
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdToolbarModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdInputModule
  ],
  declarations: []
})
export class MaterialSharedModule { }

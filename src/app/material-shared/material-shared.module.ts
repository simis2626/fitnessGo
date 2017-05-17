import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MdGridListModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';




@NgModule({
  imports: [
    CommonModule,
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdToolbarModule
  ],
  exports: [
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdToolbarModule
  ],
  declarations: []
})
export class MaterialSharedModule { }

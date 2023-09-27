import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BornePageRoutingModule } from './borne-routing.module';

import { BornePage } from './borne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BornePageRoutingModule
  ],
  declarations: [BornePage]
})
export class BornePageModule {}

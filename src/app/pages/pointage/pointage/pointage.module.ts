import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointagePageRoutingModule } from './pointage-routing.module';

import { PointagePage } from './pointage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointagePageRoutingModule
  ],
  declarations: [PointagePage]
})
export class PointagePageModule {}

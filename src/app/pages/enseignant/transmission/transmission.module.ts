import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransmissionPageRoutingModule } from './transmission-routing.module';

import { TransmissionPage } from './transmission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransmissionPageRoutingModule
  ],
  declarations: [TransmissionPage]
})
export class TransmissionPageModule {}

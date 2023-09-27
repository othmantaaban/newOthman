import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrBadgingPageRoutingModule } from './qr-badging-routing.module';

import { QrBadgingPage } from './qr-badging.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrBadgingPageRoutingModule
  ],
  declarations: [QrBadgingPage]
})
export class QrBadgingPageModule {}

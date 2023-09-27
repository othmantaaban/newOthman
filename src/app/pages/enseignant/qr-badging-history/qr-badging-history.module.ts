import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrBadgingHistoryPageRoutingModule } from './qr-badging-history-routing.module';

import { QrBadgingHistoryPage } from './qr-badging-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrBadgingHistoryPageRoutingModule
  ],
  declarations: [QrBadgingHistoryPage]
})
export class QrBadgingHistoryPageModule {}

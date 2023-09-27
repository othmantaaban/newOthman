import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrBadgingHistoryPage } from './qr-badging-history.page';

const routes: Routes = [
  {
    path: '',
    component: QrBadgingHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrBadgingHistoryPageRoutingModule {}

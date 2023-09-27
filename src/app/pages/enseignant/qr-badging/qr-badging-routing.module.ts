import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrBadgingPage } from './qr-badging.page';

const routes: Routes = [
  {
    path: '',
    component: QrBadgingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrBadgingPageRoutingModule {}

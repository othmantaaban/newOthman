import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutQrPage } from './checkout-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutQrPageRoutingModule {}

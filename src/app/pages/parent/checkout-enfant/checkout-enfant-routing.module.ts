import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutEnfantPage } from './checkout-enfant.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutEnfantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutEnfantPageRoutingModule {}

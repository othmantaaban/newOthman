import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransmissionPage } from './transmission.page';

const routes: Routes = [
  {
    path: '',
    component: TransmissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransmissionPageRoutingModule {}

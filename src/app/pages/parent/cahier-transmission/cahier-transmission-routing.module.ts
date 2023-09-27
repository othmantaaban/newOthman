import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CahierTransmissionPage } from './cahier-transmission.page';

const routes: Routes = [
  {
    path: '',
    component: CahierTransmissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CahierTransmissionPageRoutingModule {}

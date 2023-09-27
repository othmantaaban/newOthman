import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EleveDetailsPage } from './eleve-details.page';

const routes: Routes = [
  {
    path: '',
    component: EleveDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EleveDetailsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandesDetailsPage } from './demandes-details.page';

const routes: Routes = [
  {
    path: '',
    component: DemandesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandesDetailsPageRoutingModule {}

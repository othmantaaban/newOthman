import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RessourcesDetailsPage } from './ressources-details.page';

const routes: Routes = [
  {
    path: '',
    component: RessourcesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RessourcesDetailsPageRoutingModule {}

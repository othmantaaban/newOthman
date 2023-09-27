import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtatPaiementsPage } from './etat-paiements.page';

const routes: Routes = [
  {
    path: '',
    component: EtatPaiementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtatPaiementsPageRoutingModule {}

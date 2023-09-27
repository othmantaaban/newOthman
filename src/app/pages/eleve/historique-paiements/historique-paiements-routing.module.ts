import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriquePaiementsPage } from './historique-paiements.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriquePaiementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriquePaiementsPageRoutingModule {}

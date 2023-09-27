import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaiementsTabsPage } from './paiements-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: PaiementsTabsPage,
    children: [
      {
        path: '',
        redirectTo: 'etat',
        pathMatch: 'full'
      },
      {
        path: 'etat',
        loadChildren: () => import('../etat-paiements/etat-paiements.module').then( m => m.EtatPaiementsPageModule)
      },
      {
        path: 'historique',
        loadChildren: () => import('../historique-paiements/historique-paiements.module').then( m => m.HistoriquePaiementsPageModule)
      },
      {
        path: 'infos',
        loadChildren: () => import('../infos-paiements/infos-paiements.module').then( m => m.InfosPaiementsPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaiementsTabsPageRoutingModule {}

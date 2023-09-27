import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfosPaiementsPage } from './infos-paiements.page';

const routes: Routes = [
  {
    path: '',
    component: InfosPaiementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfosPaiementsPageRoutingModule {}

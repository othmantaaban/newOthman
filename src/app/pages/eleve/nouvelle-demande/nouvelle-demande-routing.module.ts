import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouvelleDemandePage } from './nouvelle-demande.page';

const routes: Routes = [
  {
    path: '',
    component: NouvelleDemandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouvelleDemandePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffreEmploiePage } from './offre-emploie.page';

const routes: Routes = [
  {
    path: '',
    component: OffreEmploiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffreEmploiePageRoutingModule {}

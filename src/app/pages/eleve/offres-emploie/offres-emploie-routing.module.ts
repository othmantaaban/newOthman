import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffresEmploiePage } from './offres-emploie.page';

const routes: Routes = [
  {
    path: '',
    component: OffresEmploiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffresEmploiePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPaiementsPage } from './form-paiements.page';

const routes: Routes = [
  {
    path: '',
    component: FormPaiementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPaiementsPageRoutingModule {}

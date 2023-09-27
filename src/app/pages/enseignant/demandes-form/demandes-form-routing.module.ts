import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandesFormPage } from './demandes-form.page';

const routes: Routes = [
  {
    path: '',
    component: DemandesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandesFormPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RessourcesFormPage } from './ressources-form.page';

const routes: Routes = [
  {
    path: '',
    component: RessourcesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RessourcesFormPageRoutingModule {}

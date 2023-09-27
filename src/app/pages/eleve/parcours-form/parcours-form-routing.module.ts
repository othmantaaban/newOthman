import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcoursFormPage } from './parcours-form.page';

const routes: Routes = [
  {
    path: '',
    component: ParcoursFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcoursFormPageRoutingModule {}

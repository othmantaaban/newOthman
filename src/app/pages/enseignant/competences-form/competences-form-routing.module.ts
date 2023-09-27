import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetencesFormPage } from './competences-form.page';

const routes: Routes = [
  {
    path: '',
    component: CompetencesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetencesFormPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetencesDetailsPage } from './competences-details.page';

const routes: Routes = [
  {
    path: '',
    component: CompetencesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetencesDetailsPageRoutingModule {}

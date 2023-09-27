import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasseDetailsPage } from './classe-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClasseDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasseDetailsPageRoutingModule {}

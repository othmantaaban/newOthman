import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompteElevePage } from './compte-eleve.page';

const routes: Routes = [
  {
    path: '',
    component: CompteElevePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompteElevePageRoutingModule {}

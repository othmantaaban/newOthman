import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CahierTextePage } from './cahier-texte.page';

const routes: Routes = [
  {
    path: '',
    component: CahierTextePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CahierTextePageRoutingModule {}

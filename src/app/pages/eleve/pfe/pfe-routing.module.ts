import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PfePage } from './pfe.page';

const routes: Routes = [
  {
    path: '',
    component: PfePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PfePageRoutingModule {}

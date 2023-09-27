import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjetsPerdusPage } from './objets-perdus.page';

const routes: Routes = [
  {
    path: '',
    component: ObjetsPerdusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObjetsPerdusPageRoutingModule {}

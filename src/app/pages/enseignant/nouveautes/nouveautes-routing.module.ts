import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveautesPage } from './nouveautes.page';

const routes: Routes = [
  {
    path: '',
    component: NouveautesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveautesPageRoutingModule {}

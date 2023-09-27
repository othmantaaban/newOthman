import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BornePage } from './borne.page';

const routes: Routes = [
  {
    path: '',
    component: BornePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BornePageRoutingModule {}

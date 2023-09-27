import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompteParentPage } from './compte-parent.page';

const routes: Routes = [
  {
    path: '',
    component: CompteParentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompteParentPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveauMessagePage } from './nouveau-message.page';

const routes: Routes = [
  {
    path: '',
    component: NouveauMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveauMessagePageRoutingModule {}

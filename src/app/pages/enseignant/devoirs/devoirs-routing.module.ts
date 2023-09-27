import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevoirsPage } from './devoirs.page';

const routes: Routes = [
  {
    path: '',
    component: DevoirsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevoirsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppreciationsDetailsPage } from './appreciations-details.page';

const routes: Routes = [
  {
    path: '',
    component: AppreciationsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppreciationsDetailsPageRoutingModule {}

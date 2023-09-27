import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevoirsFormPage } from './devoirs-form.page';

const routes: Routes = [
  {
    path: '',
    component: DevoirsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevoirsFormPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamenFormPage } from './examen-form.page';

const routes: Routes = [
  {
    path: '',
    component: ExamenFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamenFormPageRoutingModule {}

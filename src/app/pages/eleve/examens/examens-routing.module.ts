import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamensPage } from './examens.page';

const routes: Routes = [
  {
    path: '',
    component: ExamensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamensPageRoutingModule {}

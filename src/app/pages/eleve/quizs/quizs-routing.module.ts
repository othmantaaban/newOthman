import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizsPage } from './quizs.page';

const routes: Routes = [
  {
    path: '',
    component: QuizsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesFormPage } from './messages-form.page';

const routes: Routes = [
  {
    path: '',
    component: MessagesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesFormPageRoutingModule {}

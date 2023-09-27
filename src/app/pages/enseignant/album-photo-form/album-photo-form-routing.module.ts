import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumPhotoFormPage } from './album-photo-form.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumPhotoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumPhotoFormPageRoutingModule {}

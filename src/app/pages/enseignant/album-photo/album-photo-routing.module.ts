import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumPhotoPage } from './album-photo.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumPhotoPageRoutingModule {}

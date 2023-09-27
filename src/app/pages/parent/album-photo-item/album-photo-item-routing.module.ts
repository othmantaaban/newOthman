import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumPhotoItemPage } from './album-photo-item.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumPhotoItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumPhotoItemPageRoutingModule {}

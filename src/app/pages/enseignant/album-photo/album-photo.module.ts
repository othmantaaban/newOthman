import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumPhotoPageRoutingModule } from './album-photo-routing.module';

import { AlbumPhotoPage } from './album-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumPhotoPageRoutingModule
  ],
  declarations: [AlbumPhotoPage]
})
export class AlbumPhotoPageModule {}

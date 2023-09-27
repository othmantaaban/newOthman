import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumPhotoPageRoutingModule } from './album-photo-routing.module';

import { AlbumPhotoPage } from './album-photo.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumPhotoPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [AlbumPhotoPage]
})
export class AlbumPhotoPageModule {}

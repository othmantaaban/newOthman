import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumPhotoItemPageRoutingModule } from './album-photo-item-routing.module';

import { AlbumPhotoItemPage } from './album-photo-item.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
import { Media } from '@awesome-cordova-plugins/media/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumPhotoItemPageRoutingModule,
    ReactiveFormsModule,
    ParentHeaderComponentModule
  ],
  declarations: [AlbumPhotoItemPage],
  providers: [
    Media
  ]
})
export class AlbumPhotoItemPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumPhotoFormPageRoutingModule } from './album-photo-form-routing.module';

import { AlbumPhotoFormPage } from './album-photo-form.page';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumPhotoFormPageRoutingModule
  ],
  declarations: [AlbumPhotoFormPage],
  providers:[
    File
  ]
})
export class AlbumPhotoFormPageModule {}

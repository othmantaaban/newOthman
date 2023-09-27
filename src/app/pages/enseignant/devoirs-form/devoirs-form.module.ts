import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevoirsFormPageRoutingModule } from './devoirs-form-routing.module';

import { DevoirsFormPage } from './devoirs-form.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevoirsFormPageRoutingModule,
    ReactiveFormsModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [DevoirsFormPage],
  providers:[
    File
  ]
})
export class DevoirsFormPageModule {}

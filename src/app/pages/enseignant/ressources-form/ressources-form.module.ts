import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcesFormPageRoutingModule } from './ressources-form-routing.module';

import { RessourcesFormPage } from './ressources-form.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourcesFormPageRoutingModule,
    ReactiveFormsModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [RessourcesFormPage],
  providers:[
    File
  ]
})
export class RessourcesFormPageModule {}

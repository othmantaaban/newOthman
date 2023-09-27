import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComptePageRoutingModule } from './compte-routing.module';

import { ComptePage } from './compte.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComptePageRoutingModule,
    ReactiveFormsModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [ComptePage]
})
export class ComptePageModule {}

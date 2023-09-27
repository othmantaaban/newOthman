import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandesFormPageRoutingModule } from './demandes-form-routing.module';

import { DemandesFormPage } from './demandes-form.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DemandesFormPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [DemandesFormPage]
})
export class DemandesFormPageModule {}

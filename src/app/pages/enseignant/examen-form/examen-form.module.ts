import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamenFormPageRoutingModule } from './examen-form-routing.module';

import { ExamenFormPage } from './examen-form.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExamenFormPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [ExamenFormPage]
})
export class ExamenFormPageModule {}

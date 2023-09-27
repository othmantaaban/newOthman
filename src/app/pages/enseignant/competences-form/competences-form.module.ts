import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompetencesFormPageRoutingModule } from './competences-form-routing.module';

import { CompetencesFormPage } from './competences-form.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';
import { CompetenceTreeModule } from 'src/app/components/competence-tree/competence-tree.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CompetencesFormPageRoutingModule,
    EnseignantHeaderComponentModule,
    CompetenceTreeModule
  ],
  declarations: [CompetencesFormPage]
})
export class CompetencesFormPageModule {}

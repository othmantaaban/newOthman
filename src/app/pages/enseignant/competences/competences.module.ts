import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompetencesPageRoutingModule } from './competences-routing.module';

import { CompetencesPage } from './competences.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompetencesPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [CompetencesPage]
})
export class CompetencesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasseDetailsPageRoutingModule } from './classe-details-routing.module';

import { ClasseDetailsPage } from './classe-details.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasseDetailsPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [ClasseDetailsPage]
})
export class ClasseDetailsPageModule {}

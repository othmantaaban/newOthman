import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandesDetailsPageRoutingModule } from './demandes-details-routing.module';

import { DemandesDetailsPage } from './demandes-details.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandesDetailsPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [DemandesDetailsPage]
})
export class DemandesDetailsPageModule {}

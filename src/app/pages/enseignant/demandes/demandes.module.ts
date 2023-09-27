import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandesPageRoutingModule } from './demandes-routing.module';

import { DemandesPage } from './demandes.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandesPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [DemandesPage]
})
export class DemandesPageModule {}

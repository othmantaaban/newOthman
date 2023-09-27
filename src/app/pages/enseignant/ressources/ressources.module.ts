import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcesPageRoutingModule } from './ressources-routing.module';

import { RessourcesPage } from './ressources.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourcesPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [RessourcesPage]
})
export class RessourcesPageModule {}

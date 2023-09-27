import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcePageRoutingModule } from './ressource-routing.module';

import { RessourcePage } from './ressource.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourcePageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [RessourcePage]
})
export class RessourcePageModule {}

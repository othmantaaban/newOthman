import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveautesPageRoutingModule } from './nouveautes-routing.module';

import { NouveautesPage } from './nouveautes.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveautesPageRoutingModule,
    EnseignantHeaderComponentModule,
  ],
  declarations: [NouveautesPage]
})
export class NouveautesPageModule {}

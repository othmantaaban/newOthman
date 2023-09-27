import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevoirPageRoutingModule } from './devoir-routing.module';

import { DevoirPage } from './devoir.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevoirPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [DevoirPage]
})
export class DevoirPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppreciationsPageRoutingModule } from './appreciations-routing.module';

import { AppreciationsPage } from './appreciations.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppreciationsPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [AppreciationsPage]
})
export class AppreciationsPageModule {}

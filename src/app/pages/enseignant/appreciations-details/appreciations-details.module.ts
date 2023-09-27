import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppreciationsDetailsPageRoutingModule } from './appreciations-details-routing.module';

import { AppreciationsDetailsPage } from './appreciations-details.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppreciationsDetailsPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [AppreciationsDetailsPage]
})
export class AppreciationsDetailsPageModule {}

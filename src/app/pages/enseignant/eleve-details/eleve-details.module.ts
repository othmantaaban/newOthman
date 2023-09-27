import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EleveDetailsPageRoutingModule } from './eleve-details-routing.module';

import { EleveDetailsPage } from './eleve-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EleveDetailsPageRoutingModule
  ],
  declarations: [EleveDetailsPage]
})
export class EleveDetailsPageModule {}

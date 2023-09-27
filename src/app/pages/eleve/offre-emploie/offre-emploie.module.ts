import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffreEmploiePageRoutingModule } from './offre-emploie-routing.module';

import { OffreEmploiePage } from './offre-emploie.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffreEmploiePageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [OffreEmploiePage]
})
export class OffreEmploiePageModule {}

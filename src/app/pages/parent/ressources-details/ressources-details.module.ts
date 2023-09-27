import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcesDetailsPageRoutingModule } from './ressources-details-routing.module';

import { RessourcesDetailsPage } from './ressources-details.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourcesDetailsPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [RessourcesDetailsPage]
})
export class RessourcesDetailsPageModule {}

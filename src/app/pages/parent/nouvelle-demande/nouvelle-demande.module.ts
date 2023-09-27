import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouvelleDemandePageRoutingModule } from './nouvelle-demande-routing.module';

import { NouvelleDemandePage } from './nouvelle-demande.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NouvelleDemandePageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [NouvelleDemandePage]
})
export class NouvelleDemandePageModule {}

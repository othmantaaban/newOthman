import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePaiementsPageRoutingModule } from './historique-paiements-routing.module';

import { HistoriquePaiementsPage } from './historique-paiements.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquePaiementsPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [HistoriquePaiementsPage]
})
export class HistoriquePaiementsPageModule {}

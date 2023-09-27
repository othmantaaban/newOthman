import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaiementsTabsPageRoutingModule } from './paiements-tabs-routing.module';

import { PaiementsTabsPage } from './paiements-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaiementsTabsPageRoutingModule
  ],
  declarations: [PaiementsTabsPage]
})
export class PaiementsTabsPageModule {}

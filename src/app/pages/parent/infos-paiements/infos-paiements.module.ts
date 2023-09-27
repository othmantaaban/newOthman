import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfosPaiementsPageRoutingModule } from './infos-paiements-routing.module';

import { InfosPaiementsPage } from './infos-paiements.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfosPaiementsPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [InfosPaiementsPage]
})
export class InfosPaiementsPageModule {}

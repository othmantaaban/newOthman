import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtatPaiementsPageRoutingModule } from './etat-paiements-routing.module';

import { EtatPaiementsPage } from './etat-paiements.page';

import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CollapseComponentModule } from 'src/app/components/collapse/collapse.component.module';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
import { DoughnutComponentModule } from 'src/app/components/doughnut/doughnut.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtatPaiementsPageRoutingModule,
    RoundProgressModule,
    CollapseComponentModule,
    ParentHeaderComponentModule,
    DoughnutComponentModule
  ],
  declarations: [EtatPaiementsPage]
})
export class EtatPaiementsPageModule {}

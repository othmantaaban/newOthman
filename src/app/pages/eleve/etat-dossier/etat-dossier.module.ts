import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtatDossierPageRoutingModule } from './etat-dossier-routing.module';

import { EtatDossierPage } from './etat-dossier.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
import { DoughnutComponentModule } from 'src/app/components/doughnut/doughnut.component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtatDossierPageRoutingModule,
    ParentHeaderComponentModule,
    DoughnutComponentModule
  ],
  declarations: [EtatDossierPage]
})
export class EtatDossierPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPaiementsPageRoutingModule } from './form-paiements-routing.module';

import { FormPaiementsPage } from './form-paiements.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPaiementsPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [FormPaiementsPage]
})
export class FormPaiementsPageModule {}

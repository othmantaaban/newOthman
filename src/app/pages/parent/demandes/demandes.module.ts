import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandesPageRoutingModule } from './demandes-routing.module';

import { DemandesPage } from './demandes.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandesPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [DemandesPage]
})
export class DemandesPageModule {}

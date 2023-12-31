import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonComptePageRoutingModule } from './mon-compte-routing.module';

import { MonComptePage } from './mon-compte.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonComptePageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [MonComptePage]
})
export class MonComptePageModule {}

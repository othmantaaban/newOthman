import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffresEmploiePageRoutingModule } from './offres-emploie-routing.module';

import { OffresEmploiePage } from './offres-emploie.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffresEmploiePageRoutingModule,
    ParentHeaderComponentModule
  ],    
  declarations: [OffresEmploiePage]
})
export class OffresEmploiePageModule {}

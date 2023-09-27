import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevoirPageRoutingModule } from './devoir-routing.module';

import { DevoirPage } from './devoir.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevoirPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [DevoirPage]
})
export class DevoirPageModule {}

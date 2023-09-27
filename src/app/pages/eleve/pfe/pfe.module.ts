import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PfePageRoutingModule } from './pfe-routing.module';

import { PfePage } from './pfe.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PfePageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [PfePage]
})
export class PfePageModule {}

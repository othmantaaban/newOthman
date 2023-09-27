import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveautesPageRoutingModule } from './nouveautes-routing.module';

import { NouveautesPage } from './nouveautes.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
// import { ParentPageModule } from '../parent/parent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveautesPageRoutingModule,
    ParentHeaderComponentModule,
  ],
  declarations: [NouveautesPage]
})
export class NouveautesPageModule {}

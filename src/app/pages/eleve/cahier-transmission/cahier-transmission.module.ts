import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CahierTransmissionPageRoutingModule } from './cahier-transmission-routing.module';

import { CahierTransmissionPage } from './cahier-transmission.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
import { AccordionComponentModule } from 'src/app/components/accordion/accordion.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CahierTransmissionPageRoutingModule,
    ParentHeaderComponentModule,
    AccordionComponentModule
  ],
  declarations: [CahierTransmissionPage]
})
export class CahierTransmissionPageModule {}

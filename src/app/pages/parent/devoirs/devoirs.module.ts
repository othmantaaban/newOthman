import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevoirsPageRoutingModule } from './devoirs-routing.module';

import { DevoirsPage } from './devoirs.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
import { AccordionComponentModule } from 'src/app/components/accordion/accordion.component.module';
import { CollapseComponentModule } from 'src/app/components/collapse/collapse.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevoirsPageRoutingModule,
    ParentHeaderComponentModule,
    AccordionComponentModule,
    CollapseComponentModule
  ],
  declarations: [DevoirsPage]
})
export class DevoirsPageModule {}

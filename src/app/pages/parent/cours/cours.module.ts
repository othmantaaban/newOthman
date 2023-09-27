import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursPageRoutingModule } from './cours-routing.module';

import { CoursPage } from './cours.page';
import { AccordionComponentModule } from 'src/app/components/accordion/accordion.component.module';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursPageRoutingModule,
    AccordionComponentModule,
    ParentHeaderComponentModule
  ],
  declarations: [CoursPage]
})
export class CoursPageModule {}

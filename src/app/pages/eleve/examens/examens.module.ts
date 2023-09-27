import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamensPageRoutingModule } from './examens-routing.module';

import { ExamensPage } from './examens.page';
import { AccordionComponentModule } from 'src/app/components/accordion/accordion.component.module';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamensPageRoutingModule,
    AccordionComponentModule,
    ParentHeaderComponentModule
  ],
  declarations: [ExamensPage]
})
export class ExamensPageModule {}

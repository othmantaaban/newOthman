import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CompetenceTreeComponent } from './competence-tree';
import { AccordionComponentModule } from '../accordion/accordion.component.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccordionComponentModule
  ],
  exports:[
    CompetenceTreeComponent
  ],
  declarations: [
    CompetenceTreeComponent
  ]
})
export class CompetenceTreeModule {}

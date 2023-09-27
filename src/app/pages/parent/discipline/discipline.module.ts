import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisciplinePageRoutingModule } from './discipline-routing.module';

import { DisciplinePage } from './discipline.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisciplinePageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [DisciplinePage]
})
export class DisciplinePageModule {}

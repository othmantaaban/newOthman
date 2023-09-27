import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbsencesPageRoutingModule } from './absences-routing.module';

import { AbsencesPage } from './absences.page';
import { CollapseComponentModule } from 'src/app/components/collapse/collapse.component.module';

import { CalendarModule } from 'ion2-calendar';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AbsencesPageRoutingModule,
    CollapseComponentModule,
    CalendarModule,
    ParentHeaderComponentModule
  ],
  declarations: [AbsencesPage]
})
export class AbsencesPageModule {}

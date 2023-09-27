import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompetencesPageRoutingModule } from './competences-routing.module';

import { CompetencesPage } from './competences.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompetencesPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [CompetencesPage]
})
export class CompetencesPageModule {}

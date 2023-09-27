import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompteElevePageRoutingModule } from './compte-eleve-routing.module';

import { CompteElevePage } from './compte-eleve.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CompteElevePageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [CompteElevePage]
})
export class CompteElevePageModule {}

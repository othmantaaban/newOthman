import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompteParentPageRoutingModule } from './compte-parent-routing.module';

import { CompteParentPage } from './compte-parent.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CompteParentPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [CompteParentPage]
})
export class CompteParentPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcoursFormPageRoutingModule } from './parcours-form-routing.module';

import { ParcoursFormPage } from './parcours-form.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcoursFormPageRoutingModule,
    ReactiveFormsModule,
    ParentHeaderComponentModule
  ],
  declarations: [ParcoursFormPage]
})
export class ParcoursFormPageModule {}

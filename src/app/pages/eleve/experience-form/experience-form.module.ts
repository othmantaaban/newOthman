import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExperienceFormPageRoutingModule } from './experience-form-routing.module';

import { ExperienceFormPage } from './experience-form.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExperienceFormPageRoutingModule,
    ReactiveFormsModule,
    ParentHeaderComponentModule
  ],
  declarations: [ExperienceFormPage]
})
export class ExperienceFormPageModule {}

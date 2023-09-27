import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesFormPageRoutingModule } from './messages-form-routing.module';

import { MessagesFormPage } from './messages-form.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MessagesFormPageRoutingModule,
    EnseignantHeaderComponentModule,
  ],
  declarations: [MessagesFormPage]
})
export class MessagesFormPageModule {}

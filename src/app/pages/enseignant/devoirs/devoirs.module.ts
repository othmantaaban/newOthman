import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevoirsPageRoutingModule } from './devoirs-routing.module';

import { DevoirsPage } from './devoirs.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevoirsPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [DevoirsPage]
})
export class DevoirsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauMessagePageRoutingModule } from './nouveau-message-routing.module';

import { NouveauMessagePage } from './nouveau-message.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveauMessagePageRoutingModule,
    ParentHeaderComponentModule,
    ReactiveFormsModule
  ],
  declarations: [NouveauMessagePage]
})
export class NouveauMessagePageModule {}

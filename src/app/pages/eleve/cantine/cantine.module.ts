import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CantinePageRoutingModule } from './cantine-routing.module';

import { CantinePage } from './cantine.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CantinePageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [CantinePage]
})
export class CantinePageModule {}

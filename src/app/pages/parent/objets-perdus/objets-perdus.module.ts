import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjetsPerdusPageRoutingModule } from './objets-perdus-routing.module';

import { ObjetsPerdusPage } from './objets-perdus.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjetsPerdusPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [ObjetsPerdusPage]
})
export class ObjetsPerdusPageModule {}

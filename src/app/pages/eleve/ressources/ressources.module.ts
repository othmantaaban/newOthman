import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcesPageRoutingModule } from './ressources-routing.module';

import { RessourcesPage } from './ressources.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourcesPageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [RessourcesPage]
})
export class RessourcesPageModule {}

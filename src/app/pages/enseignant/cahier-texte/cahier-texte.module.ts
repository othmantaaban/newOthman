import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CahierTextePageRoutingModule } from './cahier-texte-routing.module';

import { CahierTextePage } from './cahier-texte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CahierTextePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CahierTextePage]
})
export class CahierTextePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuiviPedagogiquePageRoutingModule } from './suivi-pedagogique-routing.module';

import { SuiviPedagogiquePage } from './suivi-pedagogique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuiviPedagogiquePageRoutingModule,
  ],
  declarations: [SuiviPedagogiquePage]
})
export class SuiviPedagogiquePageModule {}

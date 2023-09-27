import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnseignantPageRoutingModule } from './enseignant-routing.module';

import { EnseignantPage } from './enseignant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnseignantPageRoutingModule
  ],
  declarations: [EnseignantPage]
})
export class EnseignantPageModule {}

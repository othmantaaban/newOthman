import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizsPageRoutingModule } from './quizs-routing.module';

import { QuizsPage } from './quizs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizsPageRoutingModule
  ],
  declarations: [QuizsPage]
})
export class QuizsPageModule {}

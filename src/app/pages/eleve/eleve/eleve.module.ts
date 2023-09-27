import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElevePageRoutingModule } from './eleve-routing.module';

import { ElevePage } from './eleve.page';
// import { ParentHeaderComponent } from 'src/app/components/parent-header/parent-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElevePageRoutingModule
  ],
  exports:[
    // ParentHeaderComponent
  ],
  declarations: [
    ElevePage,
    // ParentHeaderComponent
  ]
})
export class ElevePageModule {}

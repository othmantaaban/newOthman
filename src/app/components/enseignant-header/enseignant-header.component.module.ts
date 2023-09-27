import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EnseignantHeaderComponent } from './enseignant-header.component';


// import { ParentPageModule } from '../parent/parent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    EnseignantHeaderComponent
  ],
  declarations: [EnseignantHeaderComponent]
})
export class EnseignantHeaderComponentModule {}

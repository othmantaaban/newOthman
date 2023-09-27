import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentPageRoutingModule } from './parent-routing.module';

import { ParentPage } from './parent.page';
// import { ParentHeaderComponent } from 'src/app/components/parent-header/parent-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentPageRoutingModule
  ],
  exports:[
    // ParentHeaderComponent
  ],
  declarations: [
    ParentPage,
    // ParentHeaderComponent
  ]
})
export class ParentPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DoughnutComponent } from './doughnut.component';

// import { DoughnutsPageRoutingModule } from './doughnuts-routing.module';
// 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // DoughnutsPageRoutingModule
  ],
  exports:[
    DoughnutComponent
  ],
  declarations: [DoughnutComponent]
})
export class DoughnutComponentModule {}

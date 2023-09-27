import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcePageRoutingModule } from './ressource-routing.module';

import { RessourcePage } from './ressource.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
import { Media } from '@awesome-cordova-plugins/media/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourcePageRoutingModule,
    ParentHeaderComponentModule
  ],
  declarations: [RessourcePage],
  providers: [
    Media
  ]
})
export class RessourcePageModule {}

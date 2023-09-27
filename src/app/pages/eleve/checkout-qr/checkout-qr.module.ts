import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutQrPageRoutingModule } from './checkout-qr-routing.module';

import { CheckoutQrPage } from './checkout-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CheckoutQrPageRoutingModule
  ],
  declarations: [CheckoutQrPage]
})
export class CheckoutQrPageModule {}

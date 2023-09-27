import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointagePage } from './pointage.page';

const routes: Routes = [
  {
    path: '',
    component: PointagePage,
    children: [
      {
        path: '',
        redirectTo: 'borne',
        pathMatch: 'full'
      },
      {
        path: 'borne',
        loadChildren: () => import('../borne/borne.module').then(m => m.BornePageModule)
      },
      {
        path: 'scan-code',
        loadChildren: () => import('../scan-code/scan-code.module').then(m => m.ScanCodePageModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../checkout/checkout.module').then( m => m.CheckoutPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointagePageRoutingModule { }

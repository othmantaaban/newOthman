import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickPage } from './pick.page';

const routes: Routes = [
  {
    path: '',
    component: PickPage,
    children: [
      {
        path: '',
        redirectTo: 'trajets',
        pathMatch: 'full'
      },
      {
        path: 'trajets',
        loadChildren: () => import('../trajets/trajets.module').then(m => m.TrajetsPageModule)
      },
      {
        path: 'trajet',
        loadChildren: () => import('../trajet/trajet.module').then(m => m.TrajetPageModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('../compte/compte.module').then(m => m.ComptePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickPageRoutingModule { }

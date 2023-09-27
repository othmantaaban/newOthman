import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursDetailsPage } from './cours-details.page';

const routes: Routes = [
  {
    path: '',
    component: CoursDetailsPage,
    children: [
      {
        path: '',
        redirectTo: 'cours',
        pathMatch: 'full'
      },
      {
        path: 'cours',
        loadChildren: () =>
          import('../cours/cours.module').then(
            (m) => m.CoursPageModule
          ),
      },
      {
        path: 'cahier-texte',
        loadChildren: () => import('../cahier-texte/cahier-texte.module').then( m => m.CahierTextePageModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursDetailsPageRoutingModule {}

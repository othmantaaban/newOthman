import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RessourcesPage } from './ressources.page';

const routes: Routes = [
  {
    path: '',
    component: RessourcesPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bibliotheque'
      },
      {
        path: 'bibliotheque',
        loadChildren: () => import('../bibliotheque/bibliotheque.module').then( m => m.BibliothequePageModule)
      },
      {
        path: 'quizs',
        loadChildren: () => import('../quizs/quizs.module').then( m => m.QuizsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RessourcesPageRoutingModule {}

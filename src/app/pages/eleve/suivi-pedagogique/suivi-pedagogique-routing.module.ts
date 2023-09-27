import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuiviPedagogiquePage } from './suivi-pedagogique.page';

const routes: Routes = [
  {
    path: '',
    component: SuiviPedagogiquePage,
    children: [
      {
        path: '',
        redirectTo: 'cours',
        pathMatch: 'full'
      },
      {
        path: 'cours',
        loadChildren: () => import('../cours/cours.module').then( m => m.CoursPageModule)
      },
      {
        path: 'absences',
        loadChildren: () => import('../absences/absences.module').then( m => m.AbsencesPageModule)
      },
      {
        path: 'examens',
        loadChildren: () => import('../examens/examens.module').then( m => m.ExamensPageModule)
      },
      {
        path: 'discipline',
        loadChildren: () => import('../discipline/discipline.module').then( m => m.DisciplinePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuiviPedagogiquePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnseignantPage } from './enseignant.page';

const routes: Routes = [
  {
    path: '',
    component: EnseignantPage,
    children: [
      {
        path: '',
        redirectTo: 'planning',
        pathMatch: 'full'
      },
      {
        path: 'planning',
        loadChildren: () => import('../planning/planning.module').then( m => m.PlanningPageModule)
      },
      {
        path: 'classe-details',
        loadChildren: () => import('../classe-details/classe-details.module').then( m => m.ClasseDetailsPageModule)
      },
      {
        path: 'cours',
        loadChildren: () => import('../cours-details/cours-details.module').then( m => m.CoursDetailsPageModule)
      },
      {
        path: 'classes',
        loadChildren: () => import('../classes/classes.module').then( m => m.ClassesPageModule)
      },
      {
        path: 'transmission',
        loadChildren: () => import('../transmission/transmission.module').then( m => m.TransmissionPageModule)
      },
      {
        path: 'absence',
        loadChildren: () => import('../absence/absence.module').then( m => m.AbsencePageModule)
      },
      {
        path: 'eleve-details',
        loadChildren: () => import('../eleve-details/eleve-details.module').then( m => m.EleveDetailsPageModule)
      },
      {
        path: 'devoirs',
        loadChildren: () => import('../devoirs/devoirs.module').then( m => m.DevoirsPageModule)
      },
      {
        path: 'devoir',
        loadChildren: () => import('../devoir/devoir.module').then( m => m.DevoirPageModule)
      },
      {
        path: 'devoirs-form',
        loadChildren: () => import('../devoirs-form/devoirs-form.module').then( m => m.DevoirsFormPageModule)
      },
      {
        path: 'ressources',
        loadChildren: () => import('../ressources/ressources.module').then( m => m.RessourcesPageModule)
      },
      {
        path: 'ressource',
        loadChildren: () => import('../ressource/ressource.module').then( m => m.RessourcePageModule)
      },
      {
        path: 'ressources-form',
        loadChildren: () => import('../ressources-form/ressources-form.module').then( m => m.RessourcesFormPageModule)
      },
      {
        path: 'album-photo',
        loadChildren: () => import('../album-photo/album-photo.module').then( m => m.AlbumPhotoPageModule)
      },
      {
        path: 'album-photo-form',
        loadChildren: () => import('../album-photo-form/album-photo-form.module').then( m => m.AlbumPhotoFormPageModule)
      },
      {
        path: 'examens',
        loadChildren: () => import('../examens/examens.module').then( m => m.ExamensPageModule)
      },
      {
        path: 'examen',
        loadChildren: () => import('../examen/examen.module').then( m => m.ExamenPageModule)
      },
      {
        path: 'examen-form',
        loadChildren: () => import('../examen-form/examen-form.module').then( m => m.ExamenFormPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'message-conversation',
        loadChildren: () => import('../message-conversation/message-conversation.module').then( m => m.MessageConversationPageModule)
      },
      {
        path: 'messages-form',
        loadChildren: () => import('../messages-form/messages-form.module').then( m => m.MessagesFormPageModule)
      },
      {
        path: 'appreciations',
        loadChildren: () => import('../appreciations/appreciations.module').then( m => m.AppreciationsPageModule)
      },
      {
        path: 'appreciations-details',
        loadChildren: () => import('../appreciations-details/appreciations-details.module').then( m => m.AppreciationsDetailsPageModule)
      },
      {
        path: 'competences',
        loadChildren: () => import('../competences/competences.module').then( m => m.CompetencesPageModule)
      },
      {
        path: 'competences-details',
        loadChildren: () => import('../competences-details/competences-details.module').then( m => m.CompetencesDetailsPageModule)
      },
      {
        path: 'demandes',
        loadChildren: () => import('../demandes/demandes.module').then( m => m.DemandesPageModule)
      },
      {
        path: 'demandes-details',
        loadChildren: () => import('../demandes-details/demandes-details.module').then( m => m.DemandesDetailsPageModule)
      },
      {
        path: 'demandes-form',
        loadChildren: () => import('../demandes-form/demandes-form.module').then( m => m.DemandesFormPageModule)
      },
      {
        path: 'nouveautes',
        loadChildren: () => import('../nouveautes/nouveautes.module').then( m => m.NouveautesPageModule)
      },
      {
        path: 'post',
        loadChildren: () => import('../post/post.module').then( m => m.PostPageModule)
      },
      {
        path: 'qr-badging',
        loadChildren: () => import('../qr-badging/qr-badging.module').then( m => m.QrBadgingPageModule)
      },
      {
        path: 'qr-badging-history',
        loadChildren: () => import('../qr-badging-history/qr-badging-history.module').then( m => m.QrBadgingHistoryPageModule)
      },
      {
        path: 'competences-form',
        loadChildren: () => import('../competences-form/competences-form.module').then( m => m.CompetencesFormPageModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('../compte/compte.module').then( m => m.ComptePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnseignantPageRoutingModule {}

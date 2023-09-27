import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentPage } from './parent.page';

const routes: Routes = [
  {
    path: '',
    component: ParentPage,
    children: [
      {
        path: '',
        redirectTo: 'nouveautes',
        pathMatch: 'full'
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
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'cantine',
        loadChildren: () => import('../cantine/cantine.module').then( m => m.CantinePageModule)
      },
      {
        path: 'cahier-transmission',
        loadChildren: () => import('../cahier-transmission/cahier-transmission.module').then( m => m.CahierTransmissionPageModule)
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
        path: 'suivi-pedagogique',
        loadChildren: () => import('../suivi-pedagogique/suivi-pedagogique.module').then( m => m.SuiviPedagogiquePageModule)
      },
      {
        path: 'competences',
        loadChildren: () => import('../competences/competences.module').then( m => m.CompetencesPageModule)
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
        path: 'ressources-details',
        loadChildren: () => import('../ressources-details/ressources-details.module').then( m => m.RessourcesDetailsPageModule)
      },
      {
        path: 'quiz',
        loadChildren: () => import('../quiz/quiz.module').then( m => m.QuizPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'conversation',
        loadChildren: () => import('../conversation/conversation.module').then( m => m.ConversationPageModule)
      },
      {
        path: 'nouveau-message',
        loadChildren: () => import('../nouveau-message/nouveau-message.module').then( m => m.NouveauMessagePageModule)
      },
      {
        path: 'album-photo',
        loadChildren: () => import('../album-photo/album-photo.module').then( m => m.AlbumPhotoPageModule)
      },
      {
        path: 'demandes',
        loadChildren: () => import('../demandes/demandes.module').then( m => m.DemandesPageModule)
      },
      {
        path: 'demande',
        loadChildren: () => import('../demande/demande.module').then( m => m.DemandePageModule)
      },
      {
        path: 'nouvelle-demande',
        loadChildren: () => import('../nouvelle-demande/nouvelle-demande.module').then( m => m.NouvelleDemandePageModule)
      },
      {
        path: 'etat-paiements',
        loadChildren: () => import('../etat-paiements/etat-paiements.module').then( m => m.EtatPaiementsPageModule)
      },
      {
        path: 'mon-compte',
        loadChildren: () => import('../mon-compte/mon-compte.module').then( m => m.MonComptePageModule)
      },
      {
        path: 'compte-parent',
        loadChildren: () => import('../compte-parent/compte-parent.module').then( m => m.CompteParentPageModule)
      },
      {
        path: 'compte-eleve',
        loadChildren: () => import('../compte-eleve/compte-eleve.module').then( m => m.CompteElevePageModule)
      },
      {
        path: 'objets-perdus',
        loadChildren: () => import('../objets-perdus/objets-perdus.module').then( m => m.ObjetsPerdusPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('../forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
      },
      {
        path: 'checkout-enfant',
        loadChildren: () => import('../checkout-enfant/checkout-enfant.module').then( m => m.CheckoutEnfantPageModule)
      },
      {
        path: 'checkout-qr',
        loadChildren: () => import('../checkout-qr/checkout-qr.module').then( m => m.CheckoutQrPageModule)
      },
      {
        path: 'timeline',
        loadChildren: () => import('../timeline/timeline.module').then( m => m.TimelinePageModule)
      },
      {
        path: 'paiements-tabs',
        loadChildren: () => import('../paiements-tabs/paiements-tabs.module').then( m => m.PaiementsTabsPageModule)
      },
      {
        path: 'form-paiements',
        loadChildren: () => import('../form-paiements/form-paiements.module').then( m => m.FormPaiementsPageModule)
      },
      {
        path: 'album-photo-item',
        loadChildren: () => import('../album-photo-item/album-photo-item.module').then( m => m.AlbumPhotoItemPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentPageRoutingModule {}

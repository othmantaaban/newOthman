import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { ParentGuard } from './guards/parent.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [GuestGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'connexion',
    canActivate: [GuestGuard],
    loadChildren: () => import('./pages/connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'blank',
    loadChildren: () => import('./blank/blank.module').then( m => m.BlankPageModule)
  },
  {
    path: 'parent',
    canActivate: [ParentGuard],
    loadChildren: () => import('./pages/parent/parent/parent.module').then( m => m.ParentPageModule)
  },
  {
    path: 'enseignant',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/enseignant/enseignant/enseignant.module').then( m => m.EnseignantPageModule)
  },
  {
    path: 'pick',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pick/pick/pick.module').then( m => m.PickPageModule)
  },
  {
    path: 'pointage',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pointage/pointage/pointage.module').then( m => m.PointagePageModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard,AdminGuard],
    loadChildren: () => import('./pages/admin/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'eleve',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/eleve/eleve/eleve.module').then( m => m.ElevePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

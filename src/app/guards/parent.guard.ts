import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { FcmService } from '../services/fcm.service';
import { ParentService } from '../services/parent.service';

@Injectable({
  providedIn: 'root'
})
export class ParentGuard implements CanActivate {
  constructor(public auth: AuthService,public parentservice: ParentService, public router: Router, private fcm: FcmService) { }

  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const isAuth = await this.auth.isLoggedIn();
    console.log('auth', isAuth);

    if (isAuth&&this.parentservice.parentId&&this.parentservice.currentEleve) {

      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
  
}

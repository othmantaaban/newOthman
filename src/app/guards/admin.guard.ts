import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FcmService } from '../services/fcm.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private fcm: FcmService) { }

  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const isAuth = await this.auth.isLoggedIn();
    console.log('auth', isAuth);

    if (isAuth&&this.auth.admin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
  
}

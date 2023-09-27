import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(public auth: AuthService,public router: Router) { }
​
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = await this.auth.isLoggedIn();
    
    if (isAuth) {
      // this.router.navigate([
      //   '/tabs',
      //   {
      //     snapshot: state.url,
      //   },
      // ]);
      this.auth.goToHome();
      return false;
    }
    
    return true;
  }
  
}

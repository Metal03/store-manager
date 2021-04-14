import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private uid: string = '';
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.authService.isAuth().subscribe( auth => {
      if ( auth ) {
        this.uid = auth.uid;
      }
    })
    if ( this.uid === '' ) {
      return false;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}

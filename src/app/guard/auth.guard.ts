import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    return this.authService.userAuth.pipe(
              map( user => {
                  if(!user) {
                    // Return to login page
                    this.router.navigate(['/login']);
                    return false
                  } else {
                    return true
                  }
                }
              )
           )
  }
}

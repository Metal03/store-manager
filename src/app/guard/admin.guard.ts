import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {


  constructor(
    private authService: AuthService
  ){}
  canLoad(): Observable<boolean> | Promise<boolean> | boolean{
    let band: boolean = false;

    this.authService.isAuth().subscribe( auth => {
      if (auth) { band = true; }
      else { band = false; }
    });

    return band;
  }
  
}

import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserI } from '../../interfaces/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: UserI = { email: '' };
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isAuth().subscribe( auth => {
      if ( auth ) {
        this.user.email = auth.email;
      }
    })
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigateByUrl('login');
  }

}

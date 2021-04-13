import { Component, OnInit } from '@angular/core';
import { UserI } from '../../interfaces/interface';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public user: UserI = { email: '', password: '' };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLoginEmailUser( fregister: NgModel): void {
    this.authService.loginEmailUser(this.user.email, this.user.password)
        .then((res) => {
          this.toastr.success('Bienvenido', 'Inicio Exitoso', {
            timeOut: 2000
        });
        this.onLoginRedirect();
      }).catch((err) => this.toastr.error(err.message, 'Login error', {timeOut: 1000}));
  }

  
  onLoginRedirect(): void {
    this.router.navigate(['home']);
  }

}


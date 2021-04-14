import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

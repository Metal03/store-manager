import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuard } from './guard/admin.guard';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canLoad: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch:'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

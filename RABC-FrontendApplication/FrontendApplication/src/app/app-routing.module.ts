import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route will redirect to login
  { path: 'login', component: LoginComponent },
  {path:'register',component:RegistrationComponent},
  { path: '', component: LayoutComponent ,children:[
    { path: 'user', component: UserDashboardComponent ,canActivate:[AuthGuard]},
   { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

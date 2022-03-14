import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthorizationGuard } from './guard/authorization.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'list', component: EmployeeListComponent, canActivate:[AuthorizationGuard] },
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthorizationGuard] },
  {path: 'profile', component:MyProfileComponent, canActivate:[AuthorizationGuard] },
  {path: 'changepassword', component:ChangePasswordComponent, canActivate:[AuthorizationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

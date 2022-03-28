import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { AuthorizationGuard } from './guard/authorization.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CmsListComponent } from './components/cms-list/cms-list.component';
import { CmsDetailsComponent } from './components/cms-details/cms-details.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateDetailsComponent } from './components/template-details/template-details.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'list', component: EmployeeListComponent, canActivate:[AuthorizationGuard] },
  {path: 'dashboard', component:DashboardComponent },
  {path: 'profile', component:MyProfileComponent, canActivate:[AuthorizationGuard] },
  {path: 'changepassword', component:ChangePasswordComponent, canActivate:[AuthorizationGuard] },
  {path:'forgotpassword', component:ForgotPasswordComponent},
  {path:'otpverification', component:OtpVerificationComponent},
  {path:'resetpassword', component:ResetPasswordComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'cmslist', component:CmsListComponent},
  {path:'cmsdetails', component:CmsDetailsComponent},
  {path:'cmsdetails/:id', component:CmsDetailsComponent},
  {path:'templatelist', component:TemplateListComponent},
  {path:'templatedetails/:id', component:TemplateDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

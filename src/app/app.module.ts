import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbToastrModule, NbDialogModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogComponent } from './shared_components/dialog/dialog.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { CmsListComponent } from './components/cms-list/cms-list.component';
import { CmsDetailsComponent } from './components/cms-details/cms-details.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateDetailsComponent } from './components/template-details/template-details.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    DashboardComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    DialogComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    CmsListComponent,
    CmsDetailsComponent,
    TemplateListComponent,
    TemplateDetailsComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    NgbPaginationModule,
    LayoutModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbCardModule,
    CKEditorModule,
    FormsModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

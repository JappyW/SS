import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken } from '@angular/fire/firestore';

import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectComponent } from './projects-list/project/project.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ProjectService } from "./shared/services/projects.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { DashboardComponent } from './auth-components/dashboard/dashboard.component';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { SignUpComponent } from './auth-components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth-components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth-components/verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectInvitesComponent } from './project-invites/project-invites.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { roundUpPipe } from 'src/app/shared/pipes/roundUp.pipe'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    ProjectComponent,
    UsersComponent,
    UserComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProjectInvitesComponent,
    MyProjectsComponent,
    ProjectCreateComponent,
    roundUpPipe

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    Ng2SearchPipeModule,
    AngularFireAuthModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, { provide: FirestoreSettingsToken, useValue: {} }, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

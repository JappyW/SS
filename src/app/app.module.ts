import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken} from '@angular/fire/firestore'; 


import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ProjectService } from "./shared/projects.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from './shared/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectInvitesComponent } from './project-invites/project-invites.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';



@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
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
   
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    Ng2SearchPipeModule,
    AngularFireAuthModule,
    NgxPaginationModule
  ],
  providers: [AuthService,{ provide: FirestoreSettingsToken, useValue: {} },ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

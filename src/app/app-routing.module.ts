import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required auth-components for which route services to be activated
import { SignInComponent } from 'src/app/auth-components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/auth-components/sign-up/sign-up.component';
import { DashboardComponent } from 'src/app/auth-components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/auth-components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'src/app/auth-components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from "src/app/shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "src/app/shared/guard/secure-inner-pages.guard";
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { UsersComponent } from './users/users.component';
import { ProjectInvitesComponent } from './project-invites/project-invites.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { UserEditComponent } from './auth-components/dashboard/user-edit/user-edit.component';

// Include route guard in routes array
const routes: Routes = [
  { path: '', component:  ProjectsListComponent},
  { path: 'edit-profile', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'create-project', component: ProjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'myprojects', component: MyProjectsComponent, canActivate: [AuthGuard] },
  { path: 'invites', component: ProjectInvitesComponent, canActivate: [AuthGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
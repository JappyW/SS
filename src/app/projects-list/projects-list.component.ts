import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/projects.service'
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { Project } from '../shared/models/project.model';
import { NotificationService } from '../shared/services/notification.service';
import { User } from '../shared/models/user.model';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[];
  users: User[];
  
  recordVariable: Project;
  userVariable: User;
  
  userRole: string;
  roles: string[] = ['Developer', 'Maintainer'];

  projectName: string;
  projectDescription: string;
  projectImg: string;

  showMorePressed: false;
  showMoreUsers = 3;
  showMoreRole = 1;


  constructor( 
    private projectService: ProjectService,public authService: AuthService,
    public userService: UserService, private toastr: NotificationService
  ) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data.map(e => {
        return {
          id: e.payload.doc.id,
          imgref: e.payload.doc.data()['imgref'],
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          owner: e.payload.doc.data()['owner'],
          users: e.payload.doc.data()['users']
        } as Project;
      })
    });
  }

  edit(record) {
    this.recordVariable = record;
    this.projectName = record.name;
    this.projectDescription = record.description;
    this.projectImg = record.imgref;
  }

  update() {
    this.projectService.updateProject(this.recordVariable.id, { name: this.projectName, description: this.projectDescription, imgref: this.projectImg } as Project);
    this.toastr.showSuccess("Project has been updated!", "Updated successfuly!");
  }

  prepareToDelete(item){
    this.recordVariable = item;
  }

  delete() {
    console.log(this.recordVariable);
    this.projectService.deleteProject(this.recordVariable.id);
    this.toastr.showSuccess("Project has been deleted!", "Deleted successfuly!");
  }

  deleteUser(record, user) {
    this.userVariable = user;
    this.recordVariable = record;
  }

  updateUser() {
    this.recordVariable.users.splice(this.recordVariable.users.indexOf(this.recordVariable.users.find(x => x.email == this.userVariable.email)), 1);
    this.projectService.updateProject(this.recordVariable.id, this.recordVariable);
    this.toastr.showSuccess("User has been deleted from the project!", "Deleted successfuly!");
  }

  loadUsers(item) {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          uid: e.payload.doc.id,
          email: e.payload.doc.data()['email'],
          displayName: e.payload.doc.data()['displayName'],
          photoURL: e.payload.doc.data()['photoURL'],
          emailVerified: e.payload.doc.data()['emailVerified'],
          userDescription: e.payload.doc.data()['userDescription'],
          userTags: e.payload.doc.data()['userTags']
        } as User;
      })
    });
    this.recordVariable = item;
  }

  addUserToProject(user, role) {
    if (role) {
      if (!this.recordVariable.users) {
        this.recordVariable.users.push({ email: user.email, value: false, role: role });
      }
      else if (this.recordVariable.owner === user.email) {
        this.toastr.showError("User is an owner!", "Cannot be added!");
      }
      else if (this.recordVariable.users.indexOf(this.recordVariable.users.find(x => x.email == user.email)) == -1) {
        this.recordVariable.users.push({ email: user.email, value: false, role: role });
        this.toastr.showSuccess("User has been added to the project as a " + role + "!", "Added successfuly!");

      }
      else {
        this.toastr.showError("User is already in the project!", "Cannot be added!");
      }
    }
    else
      this.toastr.showError("User has no selected role!", "Cannot be added!");
  }

  finishTheUpdate() {
    this.userService.updateProject(this.recordVariable.id, this.recordVariable);
  }

  checkOwner(record) {
    if (this.authService.afAuth.auth.currentUser) {
      if (record.owner == this.authService.afAuth.auth.currentUser.email) {
        return true;
      }
      return false;
    }
    return false;
  }

  checkRole(item, role) {
    if (item && this.authService.afAuth.auth.currentUser) {
      for (var index = 0; index < item.length; index++) {
        if (item[index].email == this.authService.afAuth.auth.currentUser.email && item[index].role == role && item[index].value) {
          return true;
        }
      }
      return false;
    }
    return false;
  }
  /*ToDo: Change check methods into one */
}

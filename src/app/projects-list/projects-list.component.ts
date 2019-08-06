import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/projects.service'
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { Project } from '../shared/models/project.model';
import { NotificationService } from '../shared/services/notification.service';
import { User } from '../shared/models/user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ImageService } from '../shared/services/image.service';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  @ViewChild('closeUpdateProjectModal', { static: false }) closeUpdateProjectModal: ElementRef;
  @ViewChild('closeAddUsersProjectModal', { static: false }) closeAddUsersProjectModal: ElementRef;

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

  ProjectNameForm: FormGroup;
  submitted = false;
  selectedFiles: any;


  constructor(
    private projectService: ProjectService, public authService: AuthService, private fb: FormBuilder,
    public userService: UserService, private toastr: NotificationService, private imageService: ImageService
  ) {
    this.createForm();
  }

  createForm() { }
  get f() { return this.ProjectNameForm.controls; }

  ngOnInit() {
    this.ProjectNameForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]]
    });

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
  }

  update() {
    this.submitted = true;
    if (this.ProjectNameForm.invalid) {
      return;
    }
    this.projectService.updateProject(this.recordVariable.id, { name: this.projectName, description: this.projectDescription } as Project);
    this.imageService.uploadFileForProject(this.selectedFiles, this.recordVariable);
    this.closeUpdateProjectModal.nativeElement.click();
    this.toastr.showSuccess("Project has been updated!", "Updated successfuly!");
  }

  prepareToDelete(item) {
    this.recordVariable = item;
  }

  detectFiles(event) {
    this.selectedFiles = event;
  }

  delete() {
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
        this.toastr.showSuccess("User will be added to the project as a " + role + "!", "Added successfuly!");

      }
      else {
        this.toastr.showError("User is already in the project!", "Cannot be added!");
      }
    }
    else
      this.toastr.showError("User has no selected role!", "Cannot be added!");
  }

  finishTheUpdateForALL() {
    this.userService.updateProject(this.recordVariable.id, this.recordVariable);

  }

  finishTheUpdate() {
    this.finishTheUpdateForALL();
    this.toastr.showSuccess("Users have been added to the project", "Added successfuly!");
  }

  finishTheUpdateWithoutSave() {
    this.toastr.showError("Users have not been added to the project", "Error");
    this.closeAddUsersProjectModal.nativeElement.click();
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


}

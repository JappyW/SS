import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: User[];
  projects: any;

  userItem: any;

  constructor(private userService: UserService, public authService: AuthService, public toastr: NotificationService) { }

  ngOnInit() {
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


  }

  addToProject(project,role) {
    if (!project.users) {
      project.users.push({ email: this.userItem, value: false, role: role});
      this.toastr.showSuccess("User has been added to the project!", "Added successfuly!");      
    }
    else if (project.owner === this.userItem) {
      this.toastr.showError("User is an owner!", "Cannot be added!");

    }
    else if (project.users.indexOf(project.users.find(x => x.email == this.userItem)) == -1) {
      project.users.push({ email: this.userItem, value: false, role: role});
      this.userService.updateProject(project.id, project);
      this.toastr.showSuccess("User has been added to the project!", "Added successfuly!");      
    }
    else {
      this.toastr.showError("User is already in the project!", "Cannot be added!");

    }
  }

  checkUserProjects(item) {
    this.userItem = item.email;
    this.userService.getUsersProjects().subscribe(data => {
      this.projects = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          owner: e.payload.doc.data()['owner'],
          users: e.payload.doc.data()['users']
        };
      })
    });
  }


}




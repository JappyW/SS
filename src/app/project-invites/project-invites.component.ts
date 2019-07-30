import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ProjectInvitesService } from '../shared/services/project-invites.service';
import { Project } from '../shared/services/models/project.model';


@Component({
  selector: 'app-project-invites',
  templateUrl: './project-invites.component.html',
  styleUrls: ['./project-invites.component.css']
})
export class ProjectInvitesComponent implements OnInit {
  projects: Project[];

  constructor(private projectInviteService: ProjectInvitesService, public authService: AuthService) { }

  ngOnInit() {
    this.authService.afAuth.user.subscribe(user => {
      this.projectInviteService.getProjectsEmail(user.email).subscribe(data => {
        this.projects = data.map(e => {
          return {
            id: e.payload.doc.id,
            imgref: e.payload.doc.data()['imgref'],
            name: e.payload.doc.data()['name'],
            description: e.payload.doc.data()['description'],
            owner: e.payload.doc.data()['owner'],
            users: e.payload.doc.data()['users']
          };
        })
      });
    });
  }

  refuse(id, record) {
    record.users.splice(record.users.indexOf(record.users.find(x => x.email == this.authService.afAuth.auth.currentUser.email)), 1);
    this.projectInviteService.updateProject(id, record);
  }

  agree(id, record) {
    record.users[record.users.indexOf(record.users.find(x => x.email == this.authService.afAuth.auth.currentUser.email))].value = true;
    this.projectInviteService.updateProject(id, record);
  }

}

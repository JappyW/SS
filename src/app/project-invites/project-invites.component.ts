import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Project } from '../shared/models/project.model';
import { ProjectService } from '../shared/services/projects.service';


@Component({
  selector: 'app-project-invites',
  templateUrl: './project-invites.component.html',
  styleUrls: ['./project-invites.component.css']
})
export class ProjectInvitesComponent implements OnInit {
  projects: Project[];

  constructor(
    private projectsService: ProjectService, public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.afAuth.user.subscribe(user => {
      this.projectsService.getProjectsWhereEmail(user.email).subscribe(data => {
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
    });
  }

  refuse(id, record) {
    record.users.splice(record.users.indexOf(record.users.find(x => x.email == this.authService.afAuth.auth.currentUser.email)), 1);
    this.projectsService.updateProject(id, record);
  }

  agree(id, record) {
    record.users[record.users.indexOf(record.users.find(x => x.email == this.authService.afAuth.auth.currentUser.email))].value = true;
    this.projectsService.updateProject(id, record);
  }

}

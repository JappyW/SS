import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ProjectService } from '../shared/services/projects.service';
import { Project } from '../shared/models/project.model';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  projects: Project[];

  constructor(
    private projectService: ProjectService, public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.afAuth.user.subscribe(user => {
      this.projectService.getProjectsEmailWhereOwner(user.email).subscribe(data => {
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

}

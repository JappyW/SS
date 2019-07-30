import { Component, OnInit } from '@angular/core';
import { MyProjectsService } from '../shared/services/my-projects.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  projects: any;

  constructor(private myProjectsService: MyProjectsService, public authService: AuthService) { }

  ngOnInit() {
    this.authService.afAuth.user.subscribe(user => {
      this.myProjectsService.getProjectsEmail(user.email).subscribe(data => {
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

}

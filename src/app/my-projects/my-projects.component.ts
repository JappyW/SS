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


  constructor(private myProjectsService: MyProjectsService, public authService:AuthService) { }



  ngOnInit() {
    this.myProjectsService.getProjectsWhereOwner().subscribe(data =>{
      this.projects = data.map(e =>{
        return{
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          owner: e.payload.doc.data()['owner'],
          users: e.payload.doc.data()['users']
        };
      })
    });
  }

  checkRole(record){
    if(this.authService.afAuth.auth.currentUser){
      if(record.owner == this.authService.afAuth.auth.currentUser.email || record.users.indexOf(record.users.find(x=>x.email == this.authService.afAuth.auth.currentUser.email)) != -1){
        return true;
      } 
      else
        return false;
      }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ProjectInvitesService } from '../shared/project-invites.service';

@Component({
  selector: 'app-project-invites',
  templateUrl: './project-invites.component.html',
  styleUrls: ['./project-invites.component.css']
})
export class ProjectInvitesComponent implements OnInit {
  projects: any;
  userEmail: any;
  projectsNULL: any;

  constructor(private projectInviteService: ProjectInvitesService, public authService: AuthService) { } 

  ngOnInit() {    
    this.projectInviteService.getProjects().subscribe(data =>{
      this.projectsNULL = data.map(e =>{
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          owner: e.payload.doc.data()['owner'],
          users: e.payload.doc.data()['users']
        };
      })
      this.showProject();
      this.projectsNULL = {};
    });
  }
 
  showProject(){
    this.projectInviteService.getProjectsEmail(this.authService.afAuth.auth.currentUser.email).subscribe(data =>{
      this.projects = data.map(e =>{
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
 
  refuse(id,record) {     
    record.users.splice(record.users.indexOf(record.users.find(x=>x.email == this.authService.afAuth.auth.currentUser.email)),1);
    this.projectInviteService.updateProject(id, record);
  }

  agree(id,record) {   
    var index = record.users.indexOf(record.users.find(x=>x.email == this.authService.afAuth.auth.currentUser.email));
    record.users[index].value = true;
    this.projectInviteService.updateProject(id, record);
  }
  
  checkUsers(item){
    if(item){
      for(var index = 0; index < item.length; index++){
        if(item[index].email == this.authService.afAuth.auth.currentUser.email && !item[index].value){
          return true;
        }
      }
      return false;
    }
  }



}

import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/projects.service'
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any;
  projectName: string;
  projectDescription: string;
/*ToDo: Transform this component into two seperate components */
  recordVariable: any;

  userVariable: any;

  userRecordVariable: any;
  
  constructor(private projectService: ProjectService, public authService: AuthService) { } 

  ngOnInit() {
    this.projectService.getProjects().subscribe(data =>{
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

  /*ToDo: 
    Validation for project creation: name < 100 && desc < 200;
  */

  
  create() {
    if(this.authService.isLoggedIn){
      let record = {};
      record['name'] = this.projectName;
      record['description'] = this.projectDescription;
      record['users'] = [];
      record['owner'] = this.authService.afAuth.auth.currentUser.email;
      this.projectService.createProject(record).then(resp => {
        this.projectName = "";
        this.projectDescription = undefined;
      })
        .catch(error => {
          console.log(error);
        });
    }
    else{
      alert("You`re not registered!")
    }
  }
  edit(record) {
    this.recordVariable = record;
    this.projectName = record.name;
    this.projectDescription = record.description;
  }
 
  update() {
    this.recordVariable.name = this.projectName;
    this.recordVariable.description = this.projectDescription;
    this.projectService.updateProject(this.recordVariable);
  }

  /*ToDo: Delete confirmation*/ 
  delete(id){
      this.projectService.deleteProject(id);    
  }
  checkRole(record){
    if(this.authService.afAuth.auth.currentUser){
      if(record.owner == this.authService.afAuth.auth.currentUser.email){
        return true;
      } 
      else
        return false;
      }
  }

  checkUsers(item){
    if(item){      
      for(var index = 0; index < item.length; index++){
        if((item[index].email == this.authService.afAuth.auth.currentUser.email) && item[index].value){
          return true;
        }
      }
      return false;
    }
    else return false;

  }
  deleteUser(record,user){
    this.userVariable = user;
    this.userRecordVariable = record;
  }

  updateUser(){
    this.userRecordVariable.users.splice(this.userRecordVariable.users.indexOf(this.userRecordVariable.users.find(x=>x.email == this.userVariable.email)),1);
    this.projectService.updateProject(this.userRecordVariable.id, this.userRecordVariable);

  }

}

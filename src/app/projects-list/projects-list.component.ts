import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/projects.service'
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { Project } from '../shared/services/models/project.model';
import { User } from '../shared/services/models/user.model';
import { NotificationService } from '../shared/services/notification.service';
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[];
  users: any;

  projectName: string;
  projectDescription: string;

  recordVariable: Project;
  userVariable: any;
  
  constructor(private projectService: ProjectService, public authService: AuthService, public userService : UserService, private toastr: NotificationService) { } 

  ngOnInit() {
    this.projectService.getProjects().subscribe(data =>{
      this.projects = data.map(e =>{
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          owner: e.payload.doc.data()['owner'],
          users: e.payload.doc.data()['users']
        } as Project;
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
    this.toastr.showSuccess("Project has been created!", "Created successfuly!");

    }
    else{
      this.toastr.showWarning("You must be registered to perform this action!", "You`re not registered!");
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
    this.projectService.updateProject(this.recordVariable.id,this.recordVariable);
    this.toastr.showSuccess("Project has been updated!", "Updated successfuly!");

  }

  /*ToDo: Delete confirmation*/ 
  delete(id){
      this.projectService.deleteProject(id); 
      this.toastr.showSuccess("Project has been deleted!", "Deleted successfuly!");
  }

  checkOwner(record){
    if(this.authService.afAuth.auth.currentUser){
      if(record.owner == this.authService.afAuth.auth.currentUser.email){
        return true;
      } 
      else
        return false;
      }
      else
        return false;
  } 
 

  checkDeveloper(item){
    if(item && this.authService.afAuth.auth.currentUser){      
      for(var index = 0; index < item.length; index++){
        if((item[index].email == this.authService.afAuth.auth.currentUser.email && item[index].role == "Developer") && item[index].value){
          return true;
        }
      }
      return false;
    }
    else 
      return false;

  } 
  checkMaintainer(item){
    if(item && this.authService.afAuth.auth.currentUser){     
      console.log("sc");
      for(var index = 0; index < item.length; index++){
        if(item[index].email == this.authService.afAuth.auth.currentUser.email && item[index].role == "Maintainer" && item[index].value){
          return true;
        }
      }
      return false;
    }
    else 
      return false;

  }  

  deleteUser(record,user){
    this.userVariable = user;
    this.recordVariable = record;
  }

  updateUser(){
    this.recordVariable.users.splice(this.recordVariable.users.indexOf(this.recordVariable.users.find(x=>x.email == this.userVariable.email)),1);
    this.projectService.updateProject(this.recordVariable.id, this.recordVariable);
    this.toastr.showSuccess("User has been deleted from the project!", "Deleted successfuly!");
  }

  addUserToProject(item){
    this.recordVariable = item;
    this.userService.getUsers().subscribe(data =>{
      this.users = data.map(e =>{
        return {
          id: e.payload.doc.id,
          email: e.payload.doc.data()['email'],
        };
      })
    });
  } 


  updateProjectUsers(user,role){
      if(!this.recordVariable.users){
        this.recordVariable.users.push({email:user.email,value:false,role: role});
       }
       else if(this.recordVariable.owner === user.email){
        this.toastr.showError("User is an owner!", "Cannot be added!");
       }     
       else if(this.recordVariable.users.indexOf(this.recordVariable.users.find(x=>x.email == user.email)) == -1){
        this.recordVariable.users.push({email:user.email,value:false,role: role});   
         this.userService.updateProject(this.recordVariable.id, this.recordVariable);
         this.toastr.showSuccess("User has been added to the project!", "Added successfuly!");

       }
       else {
        this.toastr.showError("User is already in the project!", "Cannot be added!");
      }
     }


}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/services/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  projects: any;

  userItem : any;
  
  constructor(private userService: UserService, public authService: AuthService) { } 

  ngOnInit() {
    this.userService.getUsers().subscribe(data =>{
      this.users = data.map(e =>{
        return {
          uid: e.payload.doc.id,
          email: e.payload.doc.data()['email'],
          displayName: e.payload.doc.data()['displayName'],
          photoURL: e.payload.doc.data()['photoURL'],
          emailVerified: e.payload.doc.data()['emailVerified'],

        };
      })
    });

    
  }

  addToProject(project){
   if(!project.users){
      project.users.push({email:this.userItem,value:false});
    }
    else if(project.owner === this.userItem){
      alert("User`s cannot be added cause he is an owner");
    }     
    else if(project.users.indexOf(project.users.find(x=>x.email == this.userItem)) == -1){
      project.users.push({email:this.userItem,value:false});   
      this.userService.updateProject(project.id, project);
    }
    else {
      alert("User`s already in project");
    }
  }

  checkUserProjects(item){
    this.userItem = item.email;
    this.userService.getUsersProjects().subscribe(data =>{
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
 
  
}




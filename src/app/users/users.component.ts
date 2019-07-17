import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  projects: any;

  userItem : any;
  
  constructor(private userService: UserService, public authService: AuthService) { } 

  ngOnInit() {
    this.userService.getUsers().subscribe(data =>{
      this.users = data.map(e =>{
        return {
          id: e.payload.doc.id,
          email: e.payload.doc.data()['email'],
        };
      })
      console.log(this.users);
    });

    
  }
  addToProject(project){
    console.log(project);
    console.log(this.userItem);
   
    if(!project.users){
      project.users.push({email:this.userItem,value:false});
    }
    else{
      project.users.push({email:this.userItem,value:false});   

      this.userService.updateProject(project.id, project);
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
      console.log(this.projects);
    });
  }
 
  
}
  /*Зробити випадаючий список із усіма проектами власника, при виборі запрошувати користувача у вибраний проект */




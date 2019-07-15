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
  addToProject(userRecord){
    
  }
  /*Зробити випадаючий список із усіма проектами власника, при виборі запрошувати користувача у вибраний проект */


}

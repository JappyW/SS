import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  users: User[];

  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) { }
  

  ngOnInit() {
    this.authService.afAuth.user.subscribe(user => {
      this.userService.getUsersWhereEmail(user.email).subscribe(data => {
        this.users = data.map(e => {
          return {
            uid: e.payload.doc.id,
            email: e.payload.doc.data()['email'],
            displayName: e.payload.doc.data()['displayName'],
            photoURL: e.payload.doc.data()['photoURL'],
            emailVerified: e.payload.doc.data()['emailVerified'],
            userDescription: e.payload.doc.data()['userDescription'],
            userTags: e.payload.doc.data()['userTags']
          } as User;
        })        
      });
    });
  } 
  

}
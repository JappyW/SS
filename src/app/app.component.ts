import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user.model';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[];
  curUser: User;

  constructor(public userService: UserService, public authService: AuthService) { }

  ngOnInit() {
    this.authService.afAuth.user.subscribe(user => {
      this.curUser = user;
      this.userService.getUsers().subscribe(data => {
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

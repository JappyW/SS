import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/models/user.model';
import * as firebase from 'firebase';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  user: User;
  avatar: string;
  displayName: string;


  constructor(
    public authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit() { }

  uploadPhoto() {
    firebase.auth().currentUser.updateProfile({
      displayName: this.displayName,
      photoURL: this.avatar
    });
    this.userService.updateUser(firebase.auth().currentUser.uid, {displayName: this.displayName, email: firebase.auth().currentUser.email,
      emailVerified: firebase.auth().currentUser.emailVerified, photoURL: this.avatar,uid: firebase.auth().currentUser.uid} as User);
  }

  edit() {
    this.displayName = firebase.auth().currentUser.displayName;
    this.avatar = firebase.auth().currentUser.photoURL;
  }

}
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/models/user.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  user:User;
  avatar: string;
  displayName:string;


  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

  uploadPhoto(){
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.displayName,
      photoURL: this.avatar
    });
  }

  edit() {
    var record = firebase.auth().currentUser;
    this.displayName = record.displayName;
    this.avatar = record.photoURL;
  }

}
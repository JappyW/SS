import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase';
import { User } from 'src/app/shared/models/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  users: User[];

  avatar: string;
  displayName: string;
  userDescription: string;
  userTags: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ProjectNameForm: FormGroup;
  submitted = false;

  constructor(public authService: AuthService, public userService: UserService, private fb: FormBuilder, public toastr: NotificationService, private router: Router) {
    this.createForm();
  }
  createForm() { }
  get f() {
    return this.ProjectNameForm.controls;
  }

  ngOnInit() {
    this.ProjectNameForm = this.fb.group({
      avatar: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      userTags: ['',],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]]
    });
    this.dropdownList = [
      { id: 1, text: 'JavaScript' },
      { id: 2, text: 'Python' },
      { id: 3, text: 'Java' },
      { id: 4, text: 'C++' },
      { id: 5, text: 'Swift' },
      { id: 6, text: 'TypeScript' },
      { id: 7, text: 'Go Programming' },
      { id: 8, text: 'SQL' },
      { id: 9, text: 'Ruby' },
      { id: 10, text: 'R Programming' },
      { id: 11, text: 'PHP' },
      { id: 12, text: 'Perl' },
      { id: 13, text: 'Kotlin' },
      { id: 14, text: 'C#' },
      { id: 15, text: 'Rust' },
      { id: 16, text: 'Scheme' },
      { id: 17, text: 'Erlang' },
      { id: 18, text: 'Scala' },
      { id: 19, text: 'Elixir' },
      { id: 20, text: 'Haskell' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      limitSelection: 5,
      enableCheckAll: true,
      searchPlaceholderText: "Search for tags..."
    };
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
        this.displayName = this.users[0].displayName;
        this.avatar = this.users[0].photoURL;
        this.userDescription = this.users[0].userDescription;
        this.selectedItems = this.users[0].userTags;
      });
    });
  }

  uploadPhoto() {
    this.submitted = true;
    if (this.ProjectNameForm.invalid) {
      return;
    }
    firebase.auth().currentUser.updateProfile({
      displayName: this.displayName,
      photoURL: this.avatar,
    });
    this.userService.updateUser(firebase.auth().currentUser.uid, {
      displayName: this.displayName, email: firebase.auth().currentUser.email,
      emailVerified: firebase.auth().currentUser.emailVerified, photoURL: this.avatar, uid: firebase.auth().currentUser.uid, userDescription: this.userDescription, userTags: this.selectedItems
    } as User);
    this.toastr.showSuccess("The profile was updated","Updated successfuly");
    this.router.navigateByUrl('/dashboard');
  }
  
}

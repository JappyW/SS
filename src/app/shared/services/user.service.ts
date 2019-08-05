import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  constructor( 
    private firestore: AngularFirestore, public authService: AuthService
  ) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  getUsersWhereEmail(email) {
    return this.firestore.collection('users', ref => ref.where('email', '==', email)).snapshotChanges();
  }

  updateUser(recordID, record) {
    this.firestore.doc('users/' + recordID).update(record);
  }

  getUsersProjects() {
    return this.firestore.collection('projects', ref => ref.where('owner', '==', this.authService.afAuth.auth.currentUser.email)).snapshotChanges();
  }

  updateProject(recordID, record) {
    this.firestore.doc('projects/' + recordID).update(record);
  }


}

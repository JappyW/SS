import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class ProjectInvitesService {
  constructor(   private firestore: AngularFirestore ,public authService: AuthService ) {} 
  

  getProjects() {
    return this.firestore.collection('projects').snapshotChanges();
  }

  getProjectsEmail(userEmail) {
    return this.firestore.collection('projects', ref => ref.where("users", "array-contains", {email:userEmail, value: false})).snapshotChanges();
  }

  updateProject(recordID,record){
    this.firestore.doc('projects/' + recordID).update(record);
  }


}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})


export class ProjectInvitesService {
  constructor(   private firestore: AngularFirestore   ) {} 
  

  getProjects() {
    return this.firestore.collection('projects').snapshotChanges();
  }

  updateProject(recordID,record){
    this.firestore.doc('projects/' + recordID).update(record);
  }


}

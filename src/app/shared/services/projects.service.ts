import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})


export class ProjectService {
  constructor(   private firestore: AngularFirestore   ) {}
  
  
  createProject(record) {
    return this.firestore.collection('projects').add(record);
  }

  getProjects() {
    return this.firestore.collection('projects').snapshotChanges();
  }

  getProject(id){
    this.firestore.doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such record!");
      }
    }).catch(function(error) {
      console.log("Error getting record:", error);
    });
  }

  updateProject(recordID,record){
    this.firestore.doc('projects/' + recordID).update(record);
  }

  deleteProject(record_id) {
    this.firestore.doc('projects/' + record_id).delete();
  }

  
}

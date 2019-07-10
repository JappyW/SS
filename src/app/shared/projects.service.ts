import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from 'src/app/project.model';

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

  updateProject(recordID,record){
    this.firestore.doc('projects/' + recordID).update(record);
  }

  deleteProject(record_id) {
    this.firestore.doc('projects/' + record_id).delete();
  }
}

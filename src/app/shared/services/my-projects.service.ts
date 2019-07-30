import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class MyProjectsService {
  constructor(private firestore: AngularFirestore) { }


  getProjectsEmail(userEmail) {
    return this.firestore.collection('projects', ref => ref.where("owner", "==", userEmail)).snapshotChanges();
  }

}

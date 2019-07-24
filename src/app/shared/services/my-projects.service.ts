import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class MyProjectsService {
  constructor(   private firestore: AngularFirestore,public authService: AuthService ) {} 
  

  getProjectsWhereOwner() {
    return this.firestore.collection('projects').snapshotChanges();
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  constructor(   private firestore: AngularFirestore   ) {}
  
  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  gerUser(id){
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

  
}

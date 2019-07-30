import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ProjectInvitesService {

  constructor(private firestore: AngularFirestore, public authService: AuthService) { }



  getProjectsEmail(userEmail) {
    const Devs = this.firestore.collection('projects', ref => ref.where("users", "array-contains", { email: userEmail, value: false, role: "Developer" })).snapshotChanges();
    const Main = this.firestore.collection('projects', ref => ref.where("users", "array-contains", { email: userEmail, value: false, role: "Maintainer" })).snapshotChanges();
    return combineLatest<any[]>(Devs, Main).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
    )

  }

  updateProject(recordID, record) {
    this.firestore.doc('projects/' + recordID).update(record);
  }


}

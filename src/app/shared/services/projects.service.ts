import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from './notification.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ProjectService {

  constructor(
    private firestore: AngularFirestore, public toastr: NotificationService
  ) { }

  createProject(record) {
    return this.firestore.collection('projects').add(record);
  }

  getProjects() {
    return this.firestore.collection('projects').snapshotChanges();
  }

  getProject(id) {
    this.firestore.doc(id).ref.get().then(function (doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        this.toastr.showDanger("No such record!", "Error!");
      }
    }).catch(function (error) {
      this.toastr.showDanger("Error getting record!", error);
    });
  }

  updateProject(recordID, record) {
    this.firestore.doc('projects/' + recordID).update(record);
  }

  deleteProject(record_id) {
    this.firestore.doc('projects/' + record_id).delete();
  }

  getProjectsEmailWhereOwner(userEmail) {
    return this.firestore.collection('projects', ref => ref.where("owner", "==", userEmail)).snapshotChanges();
  }

  getProjectsWhereEmail(userEmail) {
    const Devs = this.firestore.collection('projects', ref => ref.where("users", "array-contains", { email: userEmail, value: false, role: "Developer" })).snapshotChanges();
    const Main = this.firestore.collection('projects', ref => ref.where("users", "array-contains", { email: userEmail, value: false, role: "Maintainer" })).snapshotChanges();
    return combineLatest<any[]>(Devs, Main).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
    )
  }

}

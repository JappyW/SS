import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { async } from 'q';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { ProjectService } from './projects.service';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})

export class ImageService {
    url: any;
    storageRef = firebase.storage().ref();
    test: any;
    downloadURL: any;

    constructor(
        private angularFireStorage: AngularFireStorage, private userService: UserService,
        private projectService: ProjectService, private routerLink: Router
    ) { }

    public uploadFileForUser(event: any, user, name): void {
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            const fileRef: AngularFireStorageReference = this.angularFireStorage.ref(user.uid);
            const task: AngularFireUploadTask = this.angularFireStorage.upload(user.uid, file);
            task.snapshotChanges()
                .pipe(
                    finalize(() => {
                        fileRef.getDownloadURL().subscribe(downloadURL => {
                            this.userService.updateUser(user.uid, {
                                photoURL: downloadURL
                            });
                            firebase.auth().currentUser.updateProfile({
                                displayName: name,
                                photoURL: downloadURL
                            });
                        })
                    })
                )
                .subscribe();
        }
    }




    public uploadFileForProject(event: any, project): void {
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            const fileRef: AngularFireStorageReference = this.angularFireStorage.ref(project.id);
            const task: AngularFireUploadTask = this.angularFireStorage.upload(project.id, file);
            task.snapshotChanges()
                .pipe(
                    finalize(() => {
                        fileRef.getDownloadURL().subscribe(downloadURL => {
                            this.projectService.updateProject(project.id, {
                                imgref: downloadURL
                            } as Project);
                        })
                    })
                )
                .subscribe();
        }
    }


}
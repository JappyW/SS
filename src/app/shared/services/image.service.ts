import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})

export class ImageService {
    private basePath = '/images';
    url: any;

    constructor(private afStorage: AngularFireStorage) { }

    //method to upload file at firebase storage
    async uploadFile(event, uid) {
        if (event) {
            var storageRef = firebase.storage().ref()           

            storageRef.child('images/' + uid + "3").put(event.target.files[0]);
        } else { alert('Please select an image'); }
    }

    //method to retrieve download url
    async getUrl(uid) {
        var storageRef = firebase.storage().ref();
        storageRef.child('images/' + uid + "3").getDownloadURL().then(function (url) {
            var test = url;
            console.log(test);
            return test;
        }).catch(function (error) {
            console.log(error)
        });
    }
}
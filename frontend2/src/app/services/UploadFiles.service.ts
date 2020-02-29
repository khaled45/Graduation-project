import { Injectable } from '@angular/core';
import { UploadModelModule } from '../upload-model/upload-model.module';

import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private db: AngularFireDatabase) { }

    pushUpload(upload: UploadModelModule) {
      // tslint:disable:prefer-const
      let storageRef = firebase.storage().ref();
      debugger
      let uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);
      // const storageRefT = firebase.storage().ref().child(`uploads/${upload.file.name}`).put(upload.file);
      // let gsReference = storageImg.refFromURL(`gs://uploaddragdrop.appspot.com/uploads/`);
      // const storageRefT = gsReference.child(`${upload.file.name}`).put(upload.file);
  
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
        (error) => {
          // Upload Failed
          console.log(error);
        }, () => {
          // Upload Success
          console.log(upload);
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            upload.url = downloadURL;
          });
          upload.name = upload.file.name;
          this.saveFileData(upload);
        });
    }
  
    // Writes the file details to the realtime db
    private saveFileData(upload) {
      this.db.list(`upload/`).push(upload);
    }
  
}
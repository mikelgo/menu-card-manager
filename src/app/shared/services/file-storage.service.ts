import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {FileUploadMetaData} from '../models/file-upload-meta-data';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  constructor(private fireStorage: AngularFireStorage) {}

  public upload(
    filepath: string,
    file: File,
    metadata: FileUploadMetaData | any
  ): Observable<UploadTaskSnapshot | undefined> {
    return this.fireStorage.upload(filepath, file, {customMetadata: metadata}).snapshotChanges();
  }

  // TODO implement
  public getFile() {
    throw new Error('not implemeented');
  }
}

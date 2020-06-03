import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  constructor(private fireStorage: AngularFireStorage) {}

  public upload(filepath: string, file: File): Observable<UploadTaskSnapshot | undefined> {
    return this.fireStorage.upload(filepath, file).snapshotChanges();
  }
}

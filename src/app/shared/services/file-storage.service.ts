import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {defer, from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  constructor(private fireStorage: AngularFireStorage) {}

  public upload(filepath: string, file: any): Observable<AngularFireUploadTask> {
    return defer(() => {
      from(this.fireStorage.upload(filepath, file));
    });
  }
}

import * as firebase from 'firebase';
import {DocumentChangeAction} from '@angular/fire/firestore';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;

// TODO unify the implementations with signature-overloading

export function mapToFirebaseEntityWrapper<T>(docs: QuerySnapshot<DocumentData>) {
  return docs.docs.map((doc) => {
    return {id: doc.id, value: doc.data() as T};
  });
}

export function mapSnapshotToFireBaseEntityWrapper<T>(docs: DocumentChangeAction<T>[]) {
  return docs.map((doc) => {
    return {id: doc.payload.doc.id, value: doc.payload.doc.data() as T};
  });
}

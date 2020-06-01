import {Injectable} from '@angular/core';
import {defer, from, Observable, of} from 'rxjs';
import {MenuCardsCollection} from '../models/menu-cards-collection';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {catchError, distinctUntilChanged, map, shareReplay} from 'rxjs/operators';
import {FirebaseEntityWrapper} from '../models/firebaseEntityWrapper';
import * as firebase from 'firebase';
import {mapSnapshotToFireBaseEntityWrapper, mapToFirebaseEntityWrapper} from '../util/map-to-firebase-entity-wrapper';
import {Restaurant} from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class MenuCardsService {
  private readonly MENU_CARDS_COLLECTION_NAME = 'menu-cards';
  constructor(private firestore: AngularFirestore) {}

  public getMenuCardCollections(): Observable<FirebaseEntityWrapper<string, MenuCardsCollection>[]> {
    return this.firestore
      .collection<MenuCardsCollection>(this.MENU_CARDS_COLLECTION_NAME)
      .get()
      .pipe(
        map((docs) => {
          return mapToFirebaseEntityWrapper<MenuCardsCollection>(docs);
        }),
        distinctUntilChanged(),
        shareReplay({refCount: true, bufferSize: 1})
      );
  }

  public getMenucardCollectionsSnapshot(): Observable<FirebaseEntityWrapper<string, MenuCardsCollection>[]> {
    return this.firestore
      .collection<MenuCardsCollection>(this.MENU_CARDS_COLLECTION_NAME)
      .snapshotChanges()
      .pipe(
        map((docs) => {
          return mapSnapshotToFireBaseEntityWrapper<MenuCardsCollection>(docs);
        }),
        distinctUntilChanged(),
        shareReplay({refCount: true, bufferSize: 1})
      );
  }

  public getMenuCardCollectionForRestaurant(
    restaurantId: string
  ): Observable<FirebaseEntityWrapper<string, MenuCardsCollection>[]> {
    return this.firestore
      .collection<MenuCardsCollection>(this.MENU_CARDS_COLLECTION_NAME, (ref) =>
        ref.where('restaurant', '==', restaurantId)
      )
      .get()
      .pipe(
        map((docs) => {
          return mapToFirebaseEntityWrapper<MenuCardsCollection>(docs);
        }),
        distinctUntilChanged(),
        shareReplay({refCount: true, bufferSize: 1})
      );
  }

  public createMenuCardsCollection(collection: MenuCardsCollection): Observable<DocumentReference> {
    return defer(() => {
      from(this.firestore.collection(this.MENU_CARDS_COLLECTION_NAME).add(collection)).pipe(
        catchError((err) => of(null))
      );
    });
  }

  // TODO check if this really updates an existing collection
  public updateMenuCardsCollection(collection: MenuCardsCollection): Observable<DocumentReference> {
    throw Error('not implemented');
    // return this.firestore
    //   .collection(this.MENU_CARDS_COLLECTION_NAME, (ref) => {
    //     ref.where('uuid', '==', collection.uuid);
    //   })
    //   .doc()
    //   .set(collection, {merge: true});
  }
}

import {Injectable} from '@angular/core';
import {defer, from, Observable, of} from 'rxjs';
import {MenuCardsCollection} from '../models/menu-cards-collection';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {catchError, distinctUntilChanged, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuCardsService {
  private readonly MENU_CARDS_COLLECTION_NAME = 'menu-cards';
  constructor(private firestore: AngularFirestore) {}

  public getMenuCards(): Observable<MenuCardsCollection[] | DocumentChangeAction<MenuCardsCollection[]>[]> {
    return this.firestore
      .collection<MenuCardsCollection[]>(this.MENU_CARDS_COLLECTION_NAME)
      .snapshotChanges()
      .pipe(shareReplay({refCount: true, bufferSize: 1}), distinctUntilChanged());
  }

  public getMenuCardCollectionForRestaurant(restaurantId: string): Observable<MenuCardsCollection[]> {
    return this.firestore
      .collection<MenuCardsCollection>(this.MENU_CARDS_COLLECTION_NAME, (ref) =>
        ref.where('restaurant', '==', restaurantId)
      )
      .valueChanges()
      .pipe(shareReplay({refCount: true, bufferSize: 1}), distinctUntilChanged());
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
    throw Error('not implemented')
    // return this.firestore
    //   .collection(this.MENU_CARDS_COLLECTION_NAME, (ref) => {
    //     ref.where('uuid', '==', collection.uuid);
    //   })
    //   .doc()
    //   .set(collection, {merge: true});
  }
}

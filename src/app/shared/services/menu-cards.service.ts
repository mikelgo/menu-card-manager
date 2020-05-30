import {Injectable} from '@angular/core';
import {defer, from, Observable, of} from 'rxjs';
import {MenuCardsCollection} from '../models/menu-cards-collection';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuCardsService {
  private readonly MENU_CARDS_COLLECTION_NAME = 'menu-cards';
  constructor(private firestore: AngularFirestore) {}

  public getMenuCards(): Observable<MenuCardsCollection[]> {
    return of(MOCK_MENU_CARDS_COLLECTION);
  }

  public getMenuCardCollectionForRestaurant(restaurantId: string): Observable<MenuCardsCollection> {
    return of(MOCK_MENU_CARDS_COLLECTION.find((v) => v.restaurant === restaurantId));
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
    return defer(() => {
      from(this.firestore.collection(this.MENU_CARDS_COLLECTION_NAME).add(collection)).pipe(
        catchError((err) => of(null))
      );
    });
  }
}

const MOCK_MENU_CARDS_COLLECTION: MenuCardsCollection[] = [
  {
    uuid: 'asdfv-asdf',
    restaurant: 'asasdf',
    menuCards: [
      {uuid: 'asdf', displayName: 'cw 10', mediaRef: 'media-ref-id11'},
      {uuid: 'asddf', displayName: 'cw 11', mediaRef: 'media-ref-id22'}
    ]
  },
  {
    uuid: 'asdfv-ghsdf',
    restaurant: 'asdf',
    menuCards: [
      {uuid: 'asdf-asdf', displayName: 'June 2020', mediaRef: 'media-ref-id1'},
      {uuid: 'asddf-asdf', displayName: 'July 2020', mediaRef: 'media-ref-id2'}
    ]
  }
];

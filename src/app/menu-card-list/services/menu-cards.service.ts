import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MenuCardsCollection} from '../../shared/models/menu-cards-collection';

@Injectable({
  providedIn: 'root'
})
export class MenuCardsService {
  constructor() {}

  public getMenuCards(): Observable<MenuCardsCollection[]> {
    return of(MOCK_MENU_CARDS_COLLECTION);
  }

  public getMenuCardCollectionForRestaurant(restaurantId: string): Observable<MenuCardsCollection> {
    return of(MOCK_MENU_CARDS_COLLECTION.find((v) => v.restaurant === restaurantId));
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

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
    menuCards: ['menu-1', 'menu-2']
  },
  {
    uuid: 'asdfv-ghsdf',
    restaurant: 'asdf',
    menuCards: ['menu-11', 'menu-22']
  }
];

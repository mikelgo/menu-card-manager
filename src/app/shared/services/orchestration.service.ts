import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MenuCardsCollection} from '../models/menu-cards-collection';
import {MenuCard} from '../models/menu-card';

@Injectable({
  providedIn: 'root'
})
export class OrchestrationService {
  private activeRestaurantId$$ = new Subject<string>();
  public activeRestaurantId$ = this.activeRestaurantId$$.asObservable();
  private activeMenuCardCollection$$ = new Subject<MenuCardsCollection>();
  public activeMenuCardCollection$: Observable<MenuCardsCollection> = this.activeMenuCardCollection$$.asObservable();
  private activeMenuCard$$ = new Subject<MenuCard>();
  public activeMenuCard$: Observable<MenuCard> = this.activeMenuCard$$.asObservable();
  constructor() {}

  setActiveRestaurantId(uuid: string) {
    this.activeRestaurantId$$.next(uuid);
  }

  setActiveMenuCardsCollection(collection: MenuCardsCollection) {
    this.activeMenuCardCollection$$.next(collection);
  }

  setActiveMenuCard(menuCard: MenuCard) {
    this.activeMenuCard$$.next(menuCard);
  }
}

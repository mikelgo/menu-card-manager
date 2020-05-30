import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MenuCardsCollection} from '../models/menu-cards-collection';
import {MenuCard} from '../models/menu-card';

@Injectable({
  providedIn: 'root'
})
export class OrchestrationService {
  private activeRestaurantId$$ = new Subject<string>();
  public activeRestaurantId$ = this.activeRestaurantId$$.asObservable();
  private activeMenuCardCollection$$ = new Subject();
  public activeMenuCardCollection$ = this.activeMenuCardCollection$$.asObservable();
  private activeMenuCard$$ = new Subject();
  public activeMenuCard$ = this.activeMenuCard$$.asObservable();
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

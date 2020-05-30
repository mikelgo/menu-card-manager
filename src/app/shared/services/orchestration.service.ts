import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MenuCardsCollection} from '../models/menu-cards-collection';

@Injectable({
  providedIn: 'root'
})
export class OrchestrationService {
  private activeRestaurantId$$ = new Subject<string>();
  public activeRestaurantId$ = this.activeRestaurantId$$.asObservable();
  private activeMenuCardCollection$$ = new Subject();
  public activeMenuCardCollection$ = this.activeMenuCardCollection$$.asObservable();
  constructor() { }

  setActiveRestaurantId(uuid: string) {
    this.activeRestaurantId$$.next(uuid);
  }

  setActiveMenuCardsCollection(collection: MenuCardsCollection) {
    this.activeMenuCardCollection$$.next(collection);
  }
}

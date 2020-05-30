import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {MenuCardsService} from './services/menu-cards.service';
import {MenuCardsCollection} from '../shared/models/menu-cards-collection';
import {OrchestrationService} from '../shared/services/orchestration.service';

@Component({
  selector: 'app-menu-card-list',
  templateUrl: './menu-card-list.component.html',
  styleUrls: ['./menu-card-list.component.scss']
})
export class MenuCardListComponent implements OnInit, OnDestroy {
  private destroy$$ = new Subject();
  private activeRestaurantId$: Observable<string>;
  private activeMenucardCollection$: Observable<MenuCardsCollection>;
  constructor(
    private menuCardsCollectionService: MenuCardsService,
    private orchestrationService: OrchestrationService
  ) {}

  ngOnInit(): void {
    this.activeRestaurantId$ = this.orchestrationService.activeRestaurantId$;

    this.activeMenucardCollection$ = this.activeRestaurantId$.pipe(
      switchMap((restaurantId) => this.menuCardsCollectionService.getMenuCardCollectionForRestaurant(restaurantId)),
      takeUntil(this.destroy$$)
    );
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}

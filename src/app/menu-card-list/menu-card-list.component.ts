import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {MenuCardsService} from '../shared/services/menu-cards.service';
import {MenuCardsCollection} from '../shared/models/menu-cards-collection';
import {OrchestrationService} from '../shared/services/orchestration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {normalizeRoutes} from '../shared/util/normalize-routes';
import {MenuCard} from '../shared/models/menu-card';

@Component({
  selector: 'app-menu-card-list',
  templateUrl: './menu-card-list.component.html',
  styleUrls: ['./menu-card-list.component.scss']
})
export class MenuCardListComponent implements OnInit, OnDestroy {
  public activeMenucardCollection$: Observable<MenuCardsCollection>;
  private destroy$$ = new Subject();
  private activeRestaurantId$: Observable<string>;

  constructor(
    private menuCardsCollectionService: MenuCardsService,
    private orchestrationService: OrchestrationService,
    private router: Router,
    private route: ActivatedRoute
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

  onCollectionSelect(collection: MenuCardsCollection) {
    this.orchestrationService.setActiveMenuCardsCollection(collection);
  }

  onMenuCardSelect(menuCard: MenuCard): void {
    const normalizedId = normalizeRoutes(menuCard.displayName);
    this.orchestrationService.setActiveMenuCard(menuCard);
    this.router.navigate([normalizedId], {relativeTo: this.route});
  }
}

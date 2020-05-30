import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Restaurant} from '../../models/restaurant';
import {RestaurantsService} from '../../services/restaurants.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MenuCardsCollection} from '../../models/menu-cards-collection';
import {switchMap} from 'rxjs/operators';
import {MenuCardsService} from '../../services/menu-cards.service';

@Component({
  selector: 'app-add-menu-card',
  templateUrl: './add-menu-card-dialog.component.html',
  styleUrls: ['./add-menu-card-dialog.component.scss']
})
export class AddMenuCardDialogComponent implements OnInit, OnDestroy {
  public restaurants$: Observable<Restaurant[]>;
  public menuCardsCollectionForSelectedRestaurant$: Observable<MenuCardsCollection>;
  /**
   * Form controls
   */
  public formGroup: FormGroup;
  private destroy$$ = new Subject();
  private restaurantFormControlChange$: Observable<Restaurant>;
  private menuCardNameChange$: Observable<string>;
  private menuCardFileChange$: Observable<any>;

  constructor(private restaurantsService: RestaurantsService, private menuCardsCollectionService: MenuCardsService) {}

  ngOnInit(): void {
    this.initializeForm();

    this.restaurants$ = this.restaurantsService.getRestaurants();

    this.menuCardsCollectionForSelectedRestaurant$ = this.restaurantFormControlChange$.pipe(
      switchMap((restaurant) => this.menuCardsCollectionService.getMenuCardCollectionForRestaurant(restaurant.uuid))
    );
  }
  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  private initializeForm(): void {
    this.formGroup = new FormGroup({
      restaurants: new FormControl(),
      menuCardName: new FormControl(),
      menuCardFile: new FormControl()
    });
    this.initializeFormObservables();
  }

  private initializeFormObservables(): void {
    this.restaurantFormControlChange$ = this.formGroup.controls.restaurants.valueChanges;
    this.menuCardNameChange$ = this.formGroup.controls.menuCardName.valueChanges;
    this.menuCardFileChange$ = this.formGroup.controls.menuCardFile.valueChanges;
  }
}
/*
 * a) Add dropdown with existing restaurants
 * b) on Select show existing menu-cards as info // or just only give info when entered name already exists!
 * c) on select show fields to:
 *        - add a name
 *        - add a file
 * d) enable upload button
 *
 * -----
 *
 * a) add new restaurant---> only enable when no restaurant is selected
 *
 * */

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Restaurant} from '../../models/restaurant';
import {RestaurantsService} from '../../services/restaurants.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuCardsCollection} from '../../models/menu-cards-collection';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MenuCardsService} from '../../services/menu-cards.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
  public formIsValid$: Observable<boolean>;

  public restaurantFormControlHasValueSelected$: Observable<boolean>;
  private destroy$$ = new Subject();
  private restaurantFormControlChange$: Observable<Restaurant>;
  private menuCardNameChange$: Observable<string>;
  private menuCardFileChange$: Observable<any>;

  constructor(
    private dialogRef: MatDialogRef<AddMenuCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private restaurantsService: RestaurantsService,
    private menuCardsCollectionService: MenuCardsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.restaurants$ = this.restaurantsService.getRestaurants();
    this.menuCardsCollectionForSelectedRestaurant$ = this.restaurantFormControlChange$.pipe(
      switchMap((restaurant) => this.menuCardsCollectionService.getMenuCardCollectionForRestaurant(restaurant.uuid))
    );

    this.restaurantFormControlHasValueSelected$ = this.restaurantFormControlChange$.pipe(
      map((v) => (v ? true : false)),
      startWith(false)
    );

    this.restaurantFormControlHasValueSelected$.subscribe((_) => this.setRequiredValidators());
  }
  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
  // TODO implement firebase upload
  onMenuCardSubmit() {
    throw new Error('not implemented');
  }

  onCancel() {
    this.dialogRef.close();
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

    this.formIsValid$ = this.formGroup.valueChanges.pipe(map((_) => this.formGroup.valid));
  }

  private setRequiredValidators(): void {
    this.formGroup.controls.menuCardName.setValidators(Validators.required);
    this.formGroup.controls.menuCardFile.setValidators(Validators.required);
    this.formGroup.updateValueAndValidity();
  }
}
/*
 * a) Add dropdown with existing restaurants ----X
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
// TODO form validation
// TODO upload to Firebase

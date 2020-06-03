import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Restaurant} from '../../models/restaurant';
import {RestaurantsService} from '../../services/restaurants.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuCardsCollection} from '../../models/menu-cards-collection';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MenuCardsService} from '../../services/menu-cards.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {createUUID} from '../../util/create-uuid';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FirebaseEntityWrapper} from '../../models/firebaseEntityWrapper';
import {FileStorageService} from '../../services/file-storage.service';
import {MenuFile} from '../../models/menu-file';

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
  public newRestaurantSelectChange$: Observable<boolean>;
  private destroy$$ = new Subject();
  private restaurantFormControlChange$: Observable<Restaurant>;
  private menuCardNameChange$: Observable<string>;
  private menuCardFileChange$: Observable<any>;

  constructor(
    private dialogRef: MatDialogRef<AddMenuCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private restaurantsService: RestaurantsService,
    private menuCardsCollectionService: MenuCardsService,
    private snackBar: MatSnackBar,
    private fileStorageService: FileStorageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.menuCardsCollectionService.getMenuCardCollections().subscribe(console.log);

    this.restaurants$ = this.restaurantsService
      .getRestaurants()
      .pipe(map((restaurants) => restaurants.map((r) => r.value)));

    this.restaurantFormControlHasValueSelected$ = this.restaurantFormControlChange$.pipe(
      map((v) => (v ? true : false)),
      startWith(false)
    );

    this.restaurantFormControlHasValueSelected$.subscribe((_) => this.setRequiredValidators());

    this.newRestaurantSelectChange$.subscribe((isSelected) => {
      this.toggleFormGroupVisibility(isSelected);
    });

    this.formGroup.controls.menuCardFile.valueChanges.subscribe(console.log);
  }
  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  uploadFile() {
    console.log('uploadFile() called');
    const file: MenuFile = this.formGroup.controls.menuCardFile.value;
    this.fileStorageService.upload(file.uuid, file.file).subscribe((x) => {
      console.log('UPLOAD %o', x);
    });
  }

  onMenuCardSubmit() {
    // TODo add address form fields

    const file: MenuFile = this.formGroup.controls.menuCardFile.value;
    const fileUpload$ = this.fileStorageService.upload(file.uuid, file.file).subscribe((x) => {
      console.log('UPLOAD %o', x);
    });

    if (this.isNewRestaurant()) {
      const newRestaurant: Restaurant = {
        uuid: createUUID(),
        name: this.formGroup.controls.newRestaurantName.value,
        address: null
      };
      this.restaurantsService.createRestaurant(newRestaurant).subscribe(
        (restaurant) => {},
        (error) => this.confirmError(),
        () => this.confirmCreation()
      );
    } else {
      // TODO implement Upload
      /**
       * a)  When no MenuCardsCollection there then create new otherwise update the existing one
       * b) Upload file to storage and upate MenuCardsCollection with link/ref to the file
       *
       */
      const restaurandID = this.formGroup.controls.restaurants.value.uuid;
      this.menuCardsCollectionService
        .getMenuCardCollectionForRestaurant(restaurandID)
        .pipe(
          switchMap((collection) => {
            console.log('Trying to get colleciton %o for restaurant ID %o', collection, restaurandID);
            if (this.isNewCollection(collection)) {
              const newCollection: MenuCardsCollection = {
                uuid: createUUID(),
                restaurant: restaurandID,
                menuCards: [
                  {
                    uuid: createUUID(),
                    displayName: this.formGroup.controls.menuCardName.value,
                    mediaRef: this.formGroup.controls.menuCardFile.value, // of course not correct --> ID to document
                    uploadDate: new Date(Date.now()).toISOString()
                  }
                ]
              };
              return this.menuCardsCollectionService.createMenuCardsCollection(newCollection);
            } else {
              console.log('Existing collection %o', collection);
              // existing collection
              const updatedCollection: MenuCardsCollection = {
                ...collection[0].value,
                menuCards: [
                  ...collection[0].value.menuCards,
                  {
                    uuid: createUUID(),
                    displayName: this.formGroup.controls.menuCardName.value,
                    mediaRef: this.formGroup.controls.menuCardFile.value, // of course not correct --> ID to document
                    uploadDate: new Date(Date.now()).toISOString()
                  }
                ]
              };
              return this.menuCardsCollectionService.updateMenuCardsCollection({
                id: collection[0].id,
                value: updatedCollection
              });
            }
          }),
          catchError((err) => of({}))
        )
        .subscribe(
          (x) => {},
          (error) => this.confirmError(),
          () => this.confirmCreation()
        );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateFileFormControl(event) {
    const file: MenuFile = {
      uuid: createUUID(),
      file: event.target.files[0],
      localPath: event.target.value
    };
    this.formGroup.controls.menuCardFile.patchValue(file);
  }

  private isNewCollection(collection: FirebaseEntityWrapper<string, MenuCardsCollection>[]): boolean {
    return collection.length === 0;
  }

  private initializeForm(): void {
    this.formGroup = new FormGroup({
      restaurants: new FormControl(),
      menuCardName: new FormControl(),
      menuCardFile: new FormControl(),
      newRestaurantSelect: new FormControl(),
      newRestaurantName: new FormControl()
    });
    this.initializeFormObservables();
  }

  private initializeFormObservables(): void {
    this.restaurantFormControlChange$ = this.formGroup.controls.restaurants.valueChanges;
    this.menuCardNameChange$ = this.formGroup.controls.menuCardName.valueChanges;
    this.menuCardFileChange$ = this.formGroup.controls.menuCardFile.valueChanges;

    this.newRestaurantSelectChange$ = this.formGroup.controls.newRestaurantSelect.valueChanges;
    this.formIsValid$ = this.formGroup.valueChanges.pipe(map((_) => this.formGroup.valid));
  }

  private setRequiredValidators(): void {
    this.formGroup.controls.menuCardName.setValidators(Validators.required);
    this.formGroup.controls.menuCardFile.setValidators(Validators.required);
    this.formGroup.updateValueAndValidity();
  }

  /**
   * Updates visibility of forms to update an existing restaurant or
   * to create a new one
   * @param isSelected
   */
  private toggleFormGroupVisibility(isSelected: boolean) {
    if (isSelected) {
      this.formGroup.controls.newRestaurantName.setValidators(Validators.required);
      this.formGroup.controls.restaurants.disable();
      this.formGroup.controls.menuCardName.disable();
      this.formGroup.controls.menuCardFile.disable();
    } else {
      this.formGroup.controls.newRestaurantName.clearValidators();
      this.formGroup.controls.restaurants.enable();
      this.formGroup.controls.menuCardName.enable();
      this.formGroup.controls.menuCardFile.enable();
    }
    this.formGroup.updateValueAndValidity();
  }

  private isExistingRestaurant() {
    return this.formGroup.controls.menuCardName.value;
  }

  private isNewRestaurant() {
    return this.formGroup.controls.newRestaurantName.value;
  }

  private confirmCreation() {
    this.snackBar.open('Erfolgreich angelegt - Danke für deine Mithilfe!', null, {
      duration: 2000
    });
    this.dialogRef.close();
  }

  private confirmError() {
    this.snackBar.open('Fehler beim Erstellen - versuche es später noch einmal', null, {
      duration: 4000
    });
    this.dialogRef.close();
  }

  /**
   * Query syntax of Firebase always returns an array, when you query for data.
   * It seems like it is not possible to query for a single document, when you don't know the document ID
   * @param collection
   */
  private verifyCollection(collection: FirebaseEntityWrapper<string, MenuCardsCollection>[]) {
    const collectionI = collection.map((v) => v.value);
    if (collectionI.length > 0) {
      throw Error('Inconsistent data detected. Collection can not have more than 1 value.');
    }
  }
}

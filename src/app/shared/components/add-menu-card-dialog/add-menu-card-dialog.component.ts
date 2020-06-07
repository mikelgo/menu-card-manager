import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Restaurant} from '../../models/restaurant';
import {RestaurantsService} from '../../services/restaurants.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuCardsCollection} from '../../models/menu-cards-collection';
import {map, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {MenuCardsService} from '../../services/menu-cards.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {createUUID} from '../../util/create-uuid';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FirebaseEntityWrapper} from '../../models/firebaseEntityWrapper';
import {FileStorageService} from '../../services/file-storage.service';
import {MenuFile} from '../../models/menu-file';
import {FileUploadEvent} from '../../models/file-upload-event';
import * as firebase from 'firebase';
import {FileUploadMetaData} from '../../models/file-upload-meta-data';
import {zipCodeValidator} from '../../validators/zip-code-validator';
import {urlValidator} from '../../validators/url-validator';
import {Address} from '../../models/address';
import DocumentReference = firebase.firestore.DocumentReference;

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
  public fileSending$: Observable<boolean>;
  private destroy$$ = new Subject();
  private restaurantFormControlChange$: Observable<Restaurant>;
  private menuCardNameChange$: Observable<string>;
  private menuCardFileChange$: Observable<any>;
  private fileUploadFinished$$ = new Subject<FileUploadEvent>();
  public fileUploadFinished$ = this.fileUploadFinished$$.asObservable();

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
    this.formGroup.valueChanges.subscribe((x) => console.log(this.formGroup));
    this.restaurants$ = this.restaurantsService
      .getRestaurants()
      .pipe(map((restaurants) => restaurants.map((r) => r.value)));

    this.restaurantFormControlHasValueSelected$ = this.restaurantFormControlChange$.pipe(
      map((v) => (v ? true : false)),
      startWith(false)
    );

    this.restaurantFormControlHasValueSelected$.subscribe((hasValue) => this.toggleRequiredValidators(hasValue));

    this.newRestaurantSelectChange$.subscribe((isSelected) => {
      this.toggleFormGroupVisibility(isSelected);
    });

    this.fileSending$ = this.fileUploadFinished$.pipe(
      map((event) => event.state),
      map((state) => state === 'SENDING')
    );
  }
  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  onMenuCardSubmit() {
    const file: MenuFile = this.formGroup.controls.menuCardFile.value;
    const uploadMetaData: FileUploadMetaData = {
      fileUUID: file.uuid,
      fileSize: file.file.size.toString(),
      uploadTimeStamp: new Date(Date.now()).toISOString()
    };
    this.fileStorageService
      .upload(file.uuid, file.file, uploadMetaData)
      .pipe(
        takeUntil(this.destroy$$),
        tap((_) => this.fileUploadFinished$$.next({id: file.uuid, state: 'SENDING'}))
      )
      .subscribe(
        (x) => {},
        (error) => this.fileUploadFinished$$.next({id: file.uuid, state: 'ERROR'}),
        () => this.fileUploadFinished$$.next({id: file.uuid, state: 'SUCCESS'})
      );

    let submitCollection$: Observable<DocumentReference>;

    if (this.isNewRestaurant()) {
      const newRestaurant: Restaurant = {
        uuid: createUUID(),
        name: this.formGroup.controls.newRestaurantName.value,
        address: this.getAddressFromFormFields(this.formGroup)
      };
      submitCollection$ = this.restaurantsService.createRestaurant(newRestaurant);
    } else {
      const restaurandID = this.formGroup.controls.restaurants.value.uuid;
      submitCollection$ = this.menuCardsCollectionService.getMenuCardCollectionForRestaurant(restaurandID).pipe(
        switchMap((collection) => {
          if (this.isNewCollection(collection)) {
            const newCollection: MenuCardsCollection = {
              uuid: createUUID(),
              restaurant: restaurandID,
              menuCards: [
                {
                  uuid: createUUID(),
                  displayName: this.formGroup.controls.menuCardName.value.toString().trim(),
                  mediaRef: file.uuid,
                  uploadDate: new Date(Date.now()).toISOString()
                }
              ]
            };

            return this.menuCardsCollectionService.createMenuCardsCollection(newCollection);
          } else {
            // existing collection
            const updatedCollection: MenuCardsCollection = {
              ...collection[0].value,
              menuCards: [
                ...collection[0].value.menuCards,
                {
                  uuid: createUUID(),
                  displayName: this.formGroup.controls.menuCardName.value.toString().trim(),
                  mediaRef: file.uuid,
                  uploadDate: new Date(Date.now()).toISOString()
                }
              ]
            };

            return this.menuCardsCollectionService.updateMenuCardsCollection({
              id: collection[0].id,
              value: updatedCollection
            });
          }
        })
      );
    }

    this.fileUploadFinished$.subscribe((v) => {
      if (v.state === 'SUCCESS') {
        submitCollection$.pipe(takeUntil(this.destroy$$)).subscribe(
          (x) => {},
          (error) => this.confirmError(),
          () => this.confirmCreation()
        );
      }
    });
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
      newRestaurantName: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        zipCode: new FormControl(),
        city: new FormControl(),
        websiteUrl: new FormControl(),
        googleMapsUrl: new FormControl()
      })
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

  private toggleRequiredValidators(hasValue: boolean): void {
    console.log(hasValue);
    // TODO further reasonable validators
    if (!hasValue) {
      this.formGroup.controls.menuCardName.setValidators(Validators.required);
      this.formGroup.controls.menuCardFile.setValidators(Validators.required);
      this.formGroup.get('address.street').setValidators(Validators.required);
      this.formGroup.get('address.zipCode').setValidators([Validators.required, zipCodeValidator]);
      this.formGroup.get('address.city').setValidators(Validators.required);
      this.formGroup.get('address.websiteUrl').setValidators([urlValidator]);
      this.formGroup.get('address.googleMapsUrl').setValidators([urlValidator]);
    } else {
      this.formGroup.controls.menuCardName.clearValidators();
      this.formGroup.controls.menuCardFile.clearValidators();
      this.formGroup.get('address.street').clearValidators();
      this.formGroup.get('address.zipCode').clearValidators();
      this.formGroup.get('address.city').clearValidators();
    }
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

  private getAddressFromFormFields(formgrup: FormGroup): Address {
    return {
      city: formgrup.get('address.city').value,
      zipCode: formgrup.get('address.zipCode').value,
      street: formgrup.get('address.street').value,
      websiteUrl: formgrup.get('address.websiteUrl').value ? formgrup.get('address.websiteUrl').value : '',
      googleMapsUrl: formgrup.get('address.googleMapsUrl').value ? formgrup.get('address.googleMapsUrl').value : ''
    };
  }
}

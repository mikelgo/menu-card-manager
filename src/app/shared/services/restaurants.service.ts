import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, defer, from, Observable, of} from 'rxjs';
import {Restaurant} from '../models/restaurant';
import {catchError, finalize, shareReplay} from 'rxjs/operators';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private readonly RESTAURANT_COLLECTION_NAME = 'restaurants';
  private loading$$ = new BehaviorSubject<boolean>(false);
  public pendingRestaurant$ = this.loading$$.asObservable();

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  public getRestaurants(): Observable<Restaurant[]> {
    return this.firestore
      .collection(this.RESTAURANT_COLLECTION_NAME)
      .valueChanges()
      .pipe(shareReplay({refCount: true, bufferSize: 1})) as Observable<Restaurant[]>;
  }

  public createRestaurant(restaurant: Restaurant): Observable<DocumentReference> {
    this.loading$$.next(true);
    return defer(() => {
      from(this.firestore.collection(this.RESTAURANT_COLLECTION_NAME).add(restaurant)).pipe(
        catchError((err) => of(null)),
        finalize(() => this.loading$$.next(false))
      );
    });
  }
}

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    uuid: 'asasdf',
    name: 'Siggis stube mit richtig langem Namen, so richtig lang',
    address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}
  },
  {
    uuid: 'asdf',
    name: 'Siggis stube',
    address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}
  },
  {uuid: 'asdfasdf', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {uuid: 'as', name: 'Siggis stube', address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640'}},
  {
    uuid: 'as',
    name: 'Siggis stube',
    address: {street: 'straße 1', city: 'Stubenstadt', zipCode: '73640', websiteUrl: 'www.stube.de'}
  }
];

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, defer, from, Observable, of} from 'rxjs';
import {Restaurant} from '../models/restaurant';
import {catchError, finalize, map, shareReplay} from 'rxjs/operators';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Entity} from '../models/entity';
import * as firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private readonly RESTAURANT_COLLECTION_NAME = 'restaurants';
  private loading$$ = new BehaviorSubject<boolean>(false);
  public pendingRestaurant$ = this.loading$$.asObservable();

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  public getRestaurants(): Observable<Entity<string, Restaurant>[]> {
    return this.firestore
      .collection(this.RESTAURANT_COLLECTION_NAME)
      .get()
      .pipe(
        map((docs) => {
          return docs.docs.map((doc) => {
            return {id: doc.id, value: doc.data() as Restaurant};
          });
        }),
        shareReplay({refCount: true, bufferSize: 1}));

  }

  public getRestaurantsSnapShot(): Observable<Entity<string, Restaurant>[]> {
    return this.firestore
      .collection<Restaurant>(this.RESTAURANT_COLLECTION_NAME)
      .snapshotChanges()
      .pipe(
        map((docs) => {
          return docs.map((doc) => {
            return {id: doc.payload.doc.id, value: doc.payload.doc.data() as Restaurant};
          });
        }),
        shareReplay({refCount: true, bufferSize: 1})
      );
  }

  public getRestaurant(
    docId: string
  ): Observable<DocumentSnapshot<DocumentData>> {
    return this.firestore
      .collection(this.RESTAURANT_COLLECTION_NAME)
      .doc(docId)
      .get()
      .pipe(
        shareReplay({refCount: true, bufferSize: 1})
      );
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

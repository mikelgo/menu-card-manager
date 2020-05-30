import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Restaurant} from '../../shared/models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  public getRestaurants(): Observable<Restaurant[]> {
    return of(MOCK_RESTAURANTS);
  }

  public createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    throw new Error('not implemented yet');
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

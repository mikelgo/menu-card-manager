import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from './services/restaurants.service';
import {Observable} from 'rxjs';
import {Restaurant} from '../shared/models/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  public restaurants$: Observable<Restaurant[]>;
  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.restaurants$ = this.restaurantsService.getRestaurants();
  }

}

import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from './services/restaurants.service';
import {Observable} from 'rxjs';
import {Restaurant} from '../shared/models/restaurant';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  public restaurants$: Observable<Restaurant[]>;
  constructor(private restaurantsService: RestaurantsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurants$ = this.restaurantsService.getRestaurants();
  }

  onRestaurantSelect(restaurant: Restaurant): void {
    // TODO replace spaces by hyphens in name and add fragment of UUID to ensure unique name
    // TODO add router-outlet so that menu-card-list-component can be shown
    this.router.navigate([restaurant.name], {relativeTo: this.route});
  }

}

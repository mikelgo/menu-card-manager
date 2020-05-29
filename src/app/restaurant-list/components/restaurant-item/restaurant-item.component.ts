import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Restaurant} from '../../../shared/models/restaurant';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantItemComponent implements OnInit {
  @Input() restaurant: Restaurant = null;

  @Output() selectedRestaurant = new EventEmitter<Restaurant>();
  constructor() {}

  ngOnInit(): void {}

  public onRestaurantSelect(): void {
    this.selectedRestaurant.emit(this.restaurant);
  }
}

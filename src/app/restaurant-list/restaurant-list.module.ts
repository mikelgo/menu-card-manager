import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RestaurantListComponent} from './restaurant-list.component';
import { RestaurantItemComponent } from './components/restaurant-item/restaurant-item.component';

@NgModule({
  declarations: [RestaurantListComponent, RestaurantItemComponent],
  exports: [RestaurantListComponent],
  imports: [SharedModule]
})
export class RestaurantListModule {}

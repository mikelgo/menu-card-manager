import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RestaurantListComponent} from './restaurant-list.component';
import { RestaurantItemComponent } from './components/restaurant-item/restaurant-item.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [RestaurantListComponent, RestaurantItemComponent],
  exports: [RestaurantListComponent],
  imports: [SharedModule, RouterModule]
})
export class RestaurantListModule {}

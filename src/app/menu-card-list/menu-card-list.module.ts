import {NgModule} from '@angular/core';
import {MenuCardListComponent} from './menu-card-list.component';
import {SharedModule} from '../shared/shared.module';
import {MenuCardRoutingModule} from './menu-card-routing.module';

@NgModule({
  declarations: [MenuCardListComponent],
  imports: [SharedModule, MenuCardRoutingModule]
})
export class MenuCardListModule {}

import {NgModule} from '@angular/core';
import {MenuCardListComponent} from './menu-card-list.component';
import {SharedModule} from '../shared/shared.module';
import {MenuCardRoutingModule} from './menu-card-routing.module';
import { MenuCardCollectionItemComponent } from './components/menu-card-collection-item/menu-card-collection-item.component';
import { MenuCardCollectionListComponent } from './components/menu-card-collection-list/menu-card-collection-list.component';

@NgModule({
  declarations: [MenuCardListComponent, MenuCardCollectionItemComponent, MenuCardCollectionListComponent],
  imports: [SharedModule, MenuCardRoutingModule]
})
export class MenuCardListModule {}

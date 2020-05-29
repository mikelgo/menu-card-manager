import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuCardListComponent} from './menu-card-list.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [MenuCardListComponent],
  imports: [SharedModule]
})
export class MenuCardListModule {}

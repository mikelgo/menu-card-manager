import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenuCardListComponent} from './menu-card-list.component';

const routes: Routes = [
  {path: '', component: MenuCardListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuCardRoutingModule { }

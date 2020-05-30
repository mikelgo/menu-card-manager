import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenuCardListComponent} from './menu-card-list.component';
import {MenuCardDetailComponent} from './components/menu-card-detail/menu-card-detail.component';

const routes: Routes = [
  {path: '', component: MenuCardListComponent, children: [
      {path: ':menucardId', component: MenuCardDetailComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuCardRoutingModule { }

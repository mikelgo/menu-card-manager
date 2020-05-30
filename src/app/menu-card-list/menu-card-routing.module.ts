import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenuCardListComponent} from './menu-card-list.component';

// TODO add Child component
const routes: Routes = [
  {path: '', component: MenuCardListComponent, children: [
      {path: ':menucardId', component: null}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuCardRoutingModule { }

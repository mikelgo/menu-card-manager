import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AddMenuCardDialogComponent} from './components/add-menu-card-dialog/add-menu-card-dialog.component';

const MODULES = [CommonModule, AngularMaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule];
const COMPONENTS = [AddMenuCardDialogComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule {}

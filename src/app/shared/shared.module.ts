import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const MODULES = [CommonModule, AngularMaterialModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES]
})
export class SharedModule {}

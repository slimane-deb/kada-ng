import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {PersoNextFormComponent} from './perso-next-form/perso-next-form.component';
import {PersonalFormComponent} from './personal-form/personal-form.component';
import {ResultFormComponent} from './result-form/result-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    PersoNextFormComponent,
    PersonalFormComponent,
    ResultFormComponent,
  ],
  exports: [
    MaterialModule,
    PersoNextFormComponent,
    PersonalFormComponent,
    ResultFormComponent,
  ],
  entryComponents: [
  ]
})
export class MaterialFormsModule { }

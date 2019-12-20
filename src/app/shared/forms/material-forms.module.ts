import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {PersoNextFormComponent} from './perso-next-form/perso-next-form.component';
import {PersonalFormComponent} from './personal-form/personal-form.component';
import {ResultFormComponent} from './result-form/result-form.component';
import {ExamenFormComponent} from './examen-form/examen-form.component';



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
    ExamenFormComponent
  ],
  exports: [
    MaterialModule,
    PersoNextFormComponent,
    PersonalFormComponent,
    ResultFormComponent,
    ExamenFormComponent
  ],
  entryComponents: [
  ]
})
export class MaterialFormsModule { }

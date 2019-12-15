import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialFormsModule} from './forms/material-forms.module';
import {DialogsModule} from './dialogs/dialogs.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ ],
  exports:[
    DialogsModule,
    MaterialFormsModule
  ]
})
export class SharedModule { }

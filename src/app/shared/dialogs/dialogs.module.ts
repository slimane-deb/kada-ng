import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmedDialogComponent} from './confirmed-dialog/confirmed-dialog.component';
import {MatDialogModule} from '@angular/material';



@NgModule({
  imports: [
    MatDialogModule
  ],
  declarations: [
    ConfirmedDialogComponent
  ],
  exports: [
    ConfirmedDialogComponent
  ],
  entryComponents: [
    ConfirmedDialogComponent
  ]
})
export class DialogsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatsRoutingModule } from './candidats-routing.module';
import {CandidatDetailComponent} from './candidat-detail/candidat-detail.component';
import {CandidatService} from './candidat.service';
import {CandidatNewComponent} from './candidat-new/candidat-new.component';
import {CandidatListComponent} from './candidat-list/candidat-list.component';
import {MaterialFormsModule} from '../../shared/forms/material-forms.module';
import {SharedModule} from '../../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@NgModule({
  imports: [
    SharedModule,
    MaterialFormsModule,
    CandidatsRoutingModule,
    CommonModule
  ],
  declarations: [
    CandidatDetailComponent,
    CandidatListComponent,
    CandidatNewComponent
  ],
  providers: [
    CandidatService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  entryComponents: [
    CandidatDetailComponent
  ]
})
export class CandidatsModule { }

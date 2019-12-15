import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatsRoutingModule } from './candidats-routing.module';
import {CandidatDetailComponent} from './candidat-detail/candidat-detail.component';
import {CandidatService} from './shared/candidat.service';
import {NewCandidatComponent} from './new-candidat/new-candidat.component';
import {CandidatListComponent} from './candidat-list/candidat-list.component';
import {MaterialFormsModule} from '../../shared/forms/material-forms.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    MaterialFormsModule,
    CandidatsRoutingModule
  ],
  declarations: [
    CandidatDetailComponent,
    CandidatListComponent,
    NewCandidatComponent
  ],
  providers: [
    CandidatService
  ],
  entryComponents: [
    CandidatDetailComponent
  ]
})
export class CandidatsModule { }

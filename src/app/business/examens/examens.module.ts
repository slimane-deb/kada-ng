import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamensRoutingModule } from './examens-routing.module';
import { ExamenDetailComponent } from './examen-detail/examen-detail.component';
import { ExamenListComponent } from './examen-list/examen-list.component';
import { ExamenNewComponent } from './examen-new/examen-new.component';
import {ExamenService} from './examen.service';


@NgModule({
  declarations: [ExamenDetailComponent, ExamenListComponent, ExamenNewComponent],
  imports: [
    CommonModule,
    ExamensRoutingModule,
  ],
  providers: [ExamenService]
})
export class ExamensModule { }

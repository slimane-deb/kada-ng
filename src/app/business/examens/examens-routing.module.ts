import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExamenNewComponent} from './examen-new/examen-new.component';
import {ExamenListComponent} from './examen-list/examen-list.component';
import {ExamenDetailComponent} from './examen-detail/examen-detail.component';


const examensRoutes: Routes = [
  {  path: '', component: ExamenListComponent },
  {  path: 'new', component: ExamenNewComponent },
  {  path: ':id', component: ExamenDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(examensRoutes)],
  exports: [RouterModule]
})
export class ExamensRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExamenNewComponent} from './examen-new/examen-new.component';
import {ExamenListComponent} from './examen-list/examen-list.component';


const examensRoutes: Routes = [
  {  path: '', component: ExamenListComponent },
  // 2nd Route
  {  path: 'add-examen', component: ExamenNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(examensRoutes)],
  exports: [RouterModule]
})
export class ExamensRoutingModule { }

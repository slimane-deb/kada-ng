import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidatListComponent} from './candidat-list/candidat-list.component';
import {CandidatNewComponent} from './candidat-new/candidat-new.component';


const candidatsRoutes: Routes = [
  {  path: '', component: CandidatListComponent },
  {  path: 'add', component: CandidatNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(candidatsRoutes)],
  exports: [RouterModule]
})
export class CandidatsRoutingModule { }

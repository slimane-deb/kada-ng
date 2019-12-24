import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidatListComponent} from './candidat-list/candidat-list.component';
import {CandidatNewComponent} from './candidat-new/candidat-new.component';
import {CandidatDetailComponent} from './candidat-detail/candidat-detail.component';


const candidatsRoutes: Routes = [
  {  path: '', component: CandidatListComponent },
  {  path: 'new', component: CandidatNewComponent },
  {  path: ':id', component: CandidatDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(candidatsRoutes)],
  exports: [RouterModule]
})
export class CandidatsRoutingModule { }

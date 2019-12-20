import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidatListComponent} from './candidat-list/candidat-list.component';
import {CandidatNewComponent} from './candidat-new/candidat-new.component';
import {CandidatDetailComponent} from './candidat-detail/candidat-detail.component';


const candidatsRoutes: Routes = [
  {  path: '', component: CandidatListComponent },
  {  path: ':id', component: CandidatDetailComponent },
  {  path: 'new', component: CandidatNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(candidatsRoutes)],
  exports: [RouterModule]
})
export class CandidatsRoutingModule { }

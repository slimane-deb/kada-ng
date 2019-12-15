import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidatListComponent} from './candidat-list/candidat-list.component';
import {NewCandidatComponent} from './new-candidat/new-candidat.component';


const candidatsRoutes: Routes = [
  // 1st Route
  {  path: '', component: CandidatListComponent },
  // 2nd Route
  {  path: 'add-candidat', component: NewCandidatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(candidatsRoutes)],
  exports: [RouterModule]
})
export class CandidatsRoutingModule { }

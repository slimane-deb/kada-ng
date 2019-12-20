import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'candidats',  pathMatch: 'full' },
  { path: 'candidats', loadChildren: () => import('./business/candidats/candidats.module').then(m => m.CandidatsModule) },
  { path: 'examens', loadChildren: () => import('./business/examens/examens.module').then(m => m.ExamensModule) },
  { path: '**', loadChildren: './business/page-not-found/page-not-found.module#PageNotFoundModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // {enableTracing: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

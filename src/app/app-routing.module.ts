import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './features/candidats/candidats.module#CandidatsModule' },
  { path: '**', loadChildren: './features/page-not-found/page-not-found.module#PageNotFoundModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {enableTracing: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

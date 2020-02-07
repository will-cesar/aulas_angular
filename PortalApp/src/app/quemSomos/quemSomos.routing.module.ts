import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { QuemSomosComponent } from './quemSomos.component';


const quemSomosRoutes: Routes = [
 
  { path: '', component: QuemSomosComponent, canActivate: [] },
 
];

@NgModule({
  imports: [RouterModule.forChild(quemSomosRoutes)],
  exports: [RouterModule]
})
export class QuemSomosRoutingModule { }

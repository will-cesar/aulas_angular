import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ContatoComponent } from './contato.component';


const contatoRoutes: Routes = [
 
  { path: '', component: ContatoComponent, canActivate: [] },
 
];

@NgModule({
  imports: [RouterModule.forChild(contatoRoutes)],
  exports: [RouterModule]
})
export class ContatoRoutingModule { }

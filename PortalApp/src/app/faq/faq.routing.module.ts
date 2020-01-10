import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { FAQComponent } from './faq.component';


const faqRoutes: Routes = [
 
  { path: '', component: FAQComponent, canActivate: [] },
 
];

@NgModule({
  imports: [RouterModule.forChild(faqRoutes)],
  exports: [RouterModule]
})
export class FAQRoutingModule { }

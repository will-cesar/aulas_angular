import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CheckoutStatusComponent } from './pages/status.component';
import { CheckoutAnalyzeComponent } from './pages/analise.component';


const registerRoutes: Routes = [

    //{ path: 'checkout/status/:id', component: CheckoutStatusComponent, canActivate: [] },
    { path: '', component: CheckoutStatusComponent, canActivate: [] },
    { path: 'status/:idContract', component: CheckoutStatusComponent, canActivate: [] },
    { path: 'analise', component: CheckoutAnalyzeComponent, canActivate: [] },
];

@NgModule({
    imports: [RouterModule.forChild(registerRoutes)],
    exports: [RouterModule]
})
export class CheckoutRoutingModule { }

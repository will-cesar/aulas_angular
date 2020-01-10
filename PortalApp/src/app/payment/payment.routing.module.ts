import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { PaymentContractComponent } from './pages/contract.component';
import { PaymentContractInfosComponent } from './pages/contract-infos.component';
import { PaymentClientDataComponent } from './pages/client-data.component';
import { PaymentMethodComponent } from './pages/payment-method.component';
import { ConcludedPaymentComponent } from './pages/concluded-payment.component';


const registerRoutes: Routes = [

    //{ path: 'checkout/status/:id', component: CheckoutStatusComponent, canActivate: [] },
    { path: '', component: PaymentContractComponent, canActivate: [] },
    { path: 'contrato/:idContract', component: PaymentContractComponent, canActivate: [] },
    { path: 'informacoes-adicionais/:idContract', component: PaymentContractInfosComponent, canActivate: [] },
    { path: 'seus-dados/:idContract', component: PaymentClientDataComponent, canActivate: [] },
    { path: 'forma-de-pagamento/:idContract', component: PaymentMethodComponent, canActivate: [] },
    { path: 'conclusao/:idContract', component: ConcludedPaymentComponent, canActivate: [] },
];

@NgModule({
    imports: [RouterModule.forChild(registerRoutes)],
    exports: [RouterModule]
})
export class PaymentRoutingModule { }

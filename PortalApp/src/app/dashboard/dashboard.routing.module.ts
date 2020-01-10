import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './pages/dashboard.component';
import { ProfileComponent } from './pages/profile.component';
import { NotificationsComponent } from './pages/notifications.component';
import { ServicesComponent } from './pages/services.component';
import { OrdersComponent } from './pages/orders.component';
import { OrderComponent } from './pages/order.component';
import { ContractComponent } from './pages/contract.component';
import { PaymentMethodComponent } from 'src/app/dashboard/pages/payment.component';
import { ChangePaymentMethodComponent } from './pages/change-payment.component';
import { NotificationDetailComponent } from './pages/notification-detail.component';
import { AuthGuard } from '../auth-guard.guard';


const registerRoutes: Routes = [

    //{ path: 'checkout/status/:id', component: CheckoutStatusComponent, canActivate: [] },
    { path: '', component: DashBoardComponent, canActivate: [AuthGuard] },
    { path: 'meu-perfil', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'notificacoes', component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'notificacoes/:id', component: NotificationDetailComponent, canActivate: [AuthGuard] },
    { path: 'servicos', component: ServicesComponent, canActivate: [AuthGuard] },
    { path: 'meus-pedidos', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'pedido/:idContract', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'meu-contrato', component: ContractComponent, canActivate: [AuthGuard] },
    { path: 'pagamento', component: PaymentMethodComponent, canActivate: [AuthGuard] },
    { path: 'pagamento/alterar/:idContract', component: ChangePaymentMethodComponent, canActivate: [AuthGuard] },
    { path: 'pagamento/efetuarPagamento/:idContract', component: ChangePaymentMethodComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(registerRoutes)],
    exports: [RouterModule]
})
export class DashBoardRoutingModule { }

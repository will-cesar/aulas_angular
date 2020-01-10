import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealershipComponent } from './pages/dealership.component';
import { ProfileComponent } from './pages/profile.component';
import { NotificationsComponent } from './pages/notifications.component';
import { ContractsComponent } from './pages/contracts.component';
import { AuthGuard } from '../auth-guard.guard';
import { DealershipContractComponent } from './pages/dealership-contract.component';


const registerRoutes: Routes = [

    //{ path: 'checkout/status/:id', component: CheckoutStatusComponent, canActivate: [] },
    { path: '', component: DealershipComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'notificacoes', component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'contratos', component: ContractsComponent, canActivate: [AuthGuard] },
    { path: 'contratos/:id', component: DealershipContractComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(registerRoutes)],
    exports: [RouterModule]
})
export class DealershipRoutingModule { }

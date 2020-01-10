import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketingComponent } from './shared/marketing.component';
import { Page404Component } from './components/shared/pages/page404/page404.component';
import { LoginEmployeesComponent } from './components/shared/pages/login-employees/login-employees.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [AuthGuard] },
  { path: 'simulador', loadChildren: './simulador/simulador.module#SimuladorModule', canActivate: [AuthGuard] },
  { path: 'cadastro', loadChildren: './register/register.module#RegisterModule', canActivate: [AuthGuard] },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule', canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashBoardModule', canActivate: [AuthGuard] },
  { path: 'concessionaria', loadChildren: './dealership/dealership.module#DealershipModule', canActivate: [AuthGuard] },
  { path: 'pagamento', loadChildren: './payment/payment.module#PaymentModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'contato', loadChildren: './contato/contato.module#ContatoModule', canActivate: [AuthGuard] },
  { path: 'quem-somos', loadChildren: './quemSomos/quemSomos.module#QuemSomosModule', canActivate: [AuthGuard] },
  { path: 'faq', loadChildren: './faq/faq.module#FAQModule', canActivate: [AuthGuard] },
  { path: 'marketing', component: MarketingComponent, canActivate: [AuthGuard] },
  { path: 'colaboradores', component: LoginEmployeesComponent },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    //useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

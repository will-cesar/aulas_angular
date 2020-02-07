import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { EscolhaCarroComponent } from './pages/escolhaCarro.component';
import { ConfiguracoesComponent } from './pages/configuracoes.component';
import { ResumoComponent } from './pages/resumo.component';
import { ContrateComponent } from './pages/contrate.component';



const simuladorRoutes: Routes = [

    { path: '', component: EscolhaCarroComponent, canActivate: [] },
    //{ path: ':id', component: EscolhaCarroComponent, canActivate: [] },
    { path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [] },
    { path: 'resumo', component: ResumoComponent, canActivate: [] },
    { path: 'contrate', component: ContrateComponent, canActivate: [] },

];

@NgModule({
    imports: [RouterModule.forChild(simuladorRoutes)],
    exports: [RouterModule]
})
export class SimuladorRoutingModule { }

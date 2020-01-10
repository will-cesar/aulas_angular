import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DadosPessoaisComponent } from './pages/dados-pessoais.component';
import { NacionalidadeComponent } from './pages/nacionalidade.component';
import { CadastroConcluidoComponent } from './pages/cadastro-concluido.component';
import { EnderecoComponent } from './pages/endereco.component';
import { DocumentosComponent } from './pages/documentos.component';
import { ConfirmacaoEmailComponent } from './pages/confirmacao-email.component';



const registerRoutes: Routes = [

    { path: '', component: DadosPessoaisComponent, canActivate: [] },
    { path: 'dados-pessoais', component: DadosPessoaisComponent, canActivate: [] },
    { path: 'nacionalidade', component: NacionalidadeComponent, canActivate: [] },
    { path: 'endereco', component: EnderecoComponent, canActivate: [] },
    { path: 'documentos', component: DocumentosComponent, canActivate: [] },
    { path: 'conclusao/:id', component: CadastroConcluidoComponent, canActivate: [] },
    { path: 'confirmacao-email', component: ConfirmacaoEmailComponent, canActivate: [] }
];

@NgModule({
    imports: [RouterModule.forChild(registerRoutes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }

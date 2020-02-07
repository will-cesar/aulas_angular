import { NgModule, LOCALE_ID } from '@angular/core';

import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { cmsService } from '../services/cms.service';
import { RegisterRoutingModule } from './register.routing.module';
import { DadosPessoaisComponent } from './pages/dados-pessoais.component';
import { ComponentsModule } from '../components/components.modules';
import { FilterlistPipe } from '../pipes/modelsPipe'
import { ClassNamePipe } from '../pipes/classNamePipe';
import { ClassSpecificationsPipe } from '../pipes/classSpecificationsPipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { LoaderService } from '../services/loader.service';
import { LoaderInterceptor } from '../loader.interceptor';
import { NacionalidadeComponent } from './pages/nacionalidade.component';
import { EnderecoComponent } from './pages/endereco.component';
import { DocumentosComponent } from './pages/documentos.component';
import { CadastroConcluidoComponent } from './pages/cadastro-concluido.component';
import { BreadCrumbComponent } from './components/breadcrumb/breadCrumb.component';
import { CepService } from '../services/cep.service';
import { NgxMaskModule } from 'ngx-mask'
import { AppService } from '../app.service';
import { ConfirmacaoEmailComponent } from './pages/confirmacao-email.component';

import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RegisterRoutingModule,
        SlickCarouselModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule,
        ScrollToModule.forRoot(),
        // 
        NgxMaskModule
    ],
    // exports: [Ng2BRPipesModule],
    declarations: [DadosPessoaisComponent, NacionalidadeComponent, EnderecoComponent, DocumentosComponent, BreadCrumbComponent, CadastroConcluidoComponent, ConfirmacaoEmailComponent],
    providers: [BreadCrumbComponent, LoaderService, CepService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, { provide: LOCALE_ID, useValue: 'pt-BR' }, AppService],
})
export class RegisterModule { }

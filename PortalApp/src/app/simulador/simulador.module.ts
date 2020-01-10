import { NgModule, LOCALE_ID } from '@angular/core';

import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { cmsService } from '../services/cms.service';
import { SimuladorRoutingModule } from './simulador.routing.module';
import { EscolhaCarroComponent } from './pages/escolhaCarro.component';
import { ConfiguracoesComponent } from './pages/configuracoes.component';
import { ResumoComponent } from './pages/resumo.component';
import { ContrateComponent } from './pages/contrate.component';
import { BreadCrumbComponent } from './components/breadCrumb.component'
import { ComponentsModule } from '../components/components.modules';
import { FilterlistPipe } from '../pipes/modelsPipe'
import { ClassNamePipe } from '../pipes/classNamePipe';
import { ClassSpecificationsPipe } from '../pipes/classSpecificationsPipe';
import { SimulationService } from './services/simulation.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { PrecoComponent } from './components/preco/preco.component';
import { LoaderComponent } from '../components/shared/loader/loader.component';
import { LoaderService } from '../services/loader.service';
import { LoaderInterceptor } from '../loader.interceptor';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ContractService } from '../checkout/services/contract.service';
import { AppModule } from '../app.module';
import { LoaderModule } from '../components/shared/loader/loader.module';


import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SimuladorRoutingModule,
    SlickCarouselModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    ScrollToModule.forRoot(),

    PerfectScrollbarModule,
    LoaderModule


  ],
  // exports: [Ng2BRPipesModule],
  declarations: [EscolhaCarroComponent, ConfiguracoesComponent, ResumoComponent, ContrateComponent, BreadCrumbComponent, FilterlistPipe, ClassNamePipe, ClassSpecificationsPipe, PrecoComponent],
  providers: [BreadCrumbComponent, ContractService, SimulationService, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, { provide: LOCALE_ID, useValue: 'pt-BR' }, { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }],
})
export class SimuladorModule { }

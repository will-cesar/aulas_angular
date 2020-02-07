import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { cmsService } from '../services/cms.service';
import { CheckoutRoutingModule } from './checkout.routing.module';
import { ComponentsModule } from '../components/components.modules';
import { FilterlistPipe } from '../pipes/modelsPipe'
import { ClassNamePipe } from '../pipes/classNamePipe';
import { ClassSpecificationsPipe } from '../pipes/classSpecificationsPipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { LoaderService } from '../services/loader.service';
import { LoaderInterceptor } from '../loader.interceptor';
import { CepService } from '../services/cep.service';
import { NgxMaskModule } from 'ngx-mask'
import { CheckoutStatusComponent } from './pages/status.component';
import { CheckoutAnalyzeComponent } from './pages/analise.component';
import { ContractService } from './services/contract.service';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoaderComponent } from '../components/shared/loader/loader.component';
import { AppModule } from '../app.module';
import { LoaderModule } from '../components/shared/loader/loader.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CheckoutRoutingModule,
        SlickCarouselModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule,
        ScrollToModule.forRoot(),

        NgxMaskModule, LoaderModule

    ],
    // exports: [Ng2BRPipesModule],
    declarations: [CheckoutStatusComponent, CheckoutAnalyzeComponent],
    providers: [ContractService, LoaderService, CepService, LoaderInterceptor, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }],
})
export class CheckoutModule { }

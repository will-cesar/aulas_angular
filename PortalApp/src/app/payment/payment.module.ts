import { NgModule, LOCALE_ID } from '@angular/core';

import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { cmsService } from '../services/cms.service';
import { PaymentRoutingModule } from './payment.routing.module';
import { ComponentsModule } from '../components/components.modules';
import { FilterlistPipe } from '../pipes/modelsPipe'
import { ClassNamePipe } from '../pipes/classNamePipe';
import { ClassSpecificationsPipe } from '../pipes/classSpecificationsPipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { LoaderService } from '../services/loader.service';
import { LoaderInterceptor } from '../loader.interceptor';
import { CepService } from '../services/cep.service';
import { NgxMaskModule } from 'ngx-mask'
import { PaymentContractComponent } from './pages/contract.component';
import { PaymentContractInfosComponent } from './pages/contract-infos.component';
import { PaymentClientDataComponent } from './pages/client-data.component';
import { PaymentMethodComponent } from './pages/payment-method.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConcludedPaymentComponent } from './pages/concluded-payment.component';
import { ContractService } from '../checkout/services/contract.service';
import { PaymentService } from './services/payment.service';
import { LoaderModule } from '../components/shared/loader/loader.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentRoutingModule,
    SlickCarouselModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    ScrollToModule.forRoot(),

    NgxMaskModule,
    PerfectScrollbarModule,
    LoaderModule,
    PdfViewerModule
  ],
  // exports: [Ng2BRPipesModule],
  declarations: [PaymentContractComponent, PaymentContractInfosComponent, PaymentClientDataComponent, PaymentMethodComponent, ConcludedPaymentComponent],
  providers: [ContractService, PaymentService, LoaderService, CepService, LoaderInterceptor, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, { provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class PaymentModule { }

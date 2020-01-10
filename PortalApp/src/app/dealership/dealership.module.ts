import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxMaskModule } from 'ngx-mask';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { cmsService } from '../services/cms.service';
import { DealershipRoutingModule } from './dealership.routing.module';
import { ComponentsModule } from '../components/components.modules';
import { FilterlistPipe } from '../pipes/modelsPipe'
import { ClassNamePipe } from '../pipes/classNamePipe';
import { ClassSpecificationsPipe } from '../pipes/classSpecificationsPipe';
import { NumberToWordsPipe } from '../pipes/numberToWordsPipe';

import { LoaderService } from '../services/loader.service';
import { LoaderInterceptor } from '../loader.interceptor';
import { CepService } from '../services/cep.service';
import { DealershipComponent } from './pages/dealership.component';
import { ProfileComponent } from './pages/profile.component';
import { NotificationsComponent } from './pages/notifications.component';
import { ContractsComponent } from './pages/contracts.component';
import { DealershipContractComponent } from './pages/dealership-contract.component';
import { LoaderModule } from '../components/shared/loader/loader.module';
//import { ContractService } from '../checkout/services/contract.service';
import { ContractService } from './services/contract.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DealershipRoutingModule,
        SlickCarouselModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule,
        ScrollToModule.forRoot(),
        LoaderModule,
        NgxMaskModule
    ],
    // exports: [Ng2BRPipesModule],
    declarations: [DealershipComponent, ProfileComponent, NotificationsComponent, ContractsComponent, DealershipContractComponent],
    providers: [LoaderService, CepService, LoaderInterceptor, ContractService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }],
})
export class DealershipModule { }

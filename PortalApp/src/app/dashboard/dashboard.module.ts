import { NgModule, LOCALE_ID } from '@angular/core';

import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { cmsService } from '../services/cms.service';
import { DashBoardRoutingModule } from './dashboard.routing.module';
import { ComponentsModule } from '../components/components.modules';
import { FilterlistPipe } from '../pipes/modelsPipe'
import { ClassNamePipe } from '../pipes/classNamePipe';
import { ClassSpecificationsPipe } from '../pipes/classSpecificationsPipe';
import { NumberToWordsPipe } from '../pipes/numberToWordsPipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { LoaderService } from '../services/loader.service';
import { LoaderInterceptor } from '../loader.interceptor';
import { CepService } from '../services/cep.service';
import { NgxMaskModule } from 'ngx-mask';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DashBoardComponent } from './pages/dashboard.component';
import { ProfileComponent } from './pages/profile.component';
import { NotificationsComponent } from './pages/notifications.component';
import { ServicesComponent } from './pages/services.component';
import { OrdersComponent } from './pages/orders.component';
import { OrderComponent } from './pages/order.component';
import { ContractComponent } from './pages/contract.component';
import { PaymentMethodComponent } from 'src/app/dashboard/pages/payment.component';
import { ChangePaymentMethodComponent } from './pages/change-payment.component';
import { RegisterService } from '../services/register.service';
import { ContractService } from '../checkout/services/contract.service';
import { PaymentService } from '../payment/services/payment.service';
import { LoaderComponent } from '../components/shared/loader/loader.component';
import { AppModule } from '../app.module';
import { LoaderModule } from '../components/shared/loader/loader.module';
import { NotificationDetailComponent } from './pages/notification-detail.component';
import { dashboardService } from './services/dashboard.service';

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
        DashBoardRoutingModule,
        SlickCarouselModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule,
        ScrollToModule.forRoot(),
        NgxMaskModule,
        LoaderModule
    ],
    // exports: [Ng2BRPipesModule],
    declarations: [DashBoardComponent, ProfileComponent, NotificationsComponent, ServicesComponent, OrdersComponent, OrderComponent, ContractComponent, PaymentMethodComponent, ChangePaymentMethodComponent, NumberToWordsPipe, NotificationDetailComponent],
    providers: [PaymentService, ContractService, RegisterService, LoaderService, CepService, LoaderInterceptor, dashboardService, { provide: LOCALE_ID, useValue: 'pt-BR' }, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }],
})
export class DashBoardModule { }

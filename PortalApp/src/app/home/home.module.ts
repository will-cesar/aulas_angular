import { NgModule } from '@angular/core';

import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeRoutingModule } from './home.routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { cmsService } from '../services/cms.service';
import { ComponentsModule } from '../components/components.modules';


import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);




@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        SlickCarouselModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule,
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [cmsService, { provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class HomeModule { }

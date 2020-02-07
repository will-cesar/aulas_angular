import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FAQRoutingModule } from './faq.routing.module';
import { FAQComponent } from './faq.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { cmsService } from '../services/cms.service';
import { ComponentsModule } from '../components/components.modules';


    
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FAQRoutingModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule
    ],
    exports: [], 
    declarations: [FAQComponent],
    providers: [cmsService],
})
export class FAQModule { }

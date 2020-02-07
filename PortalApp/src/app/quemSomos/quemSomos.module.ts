import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuemSomosRoutingModule } from './quemSomos.routing.module';
import { QuemSomosComponent } from './quemSomos.component';
import { ComponentsModule } from '../components/components.modules';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { cmsService } from '../services/cms.service';



    
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuemSomosRoutingModule,
        ComponentsModule,
        HttpModule,
        HttpClientModule,
    ],
    exports: [], 
    declarations: [QuemSomosComponent],
    providers: [cmsService],
})
export class QuemSomosModule { }

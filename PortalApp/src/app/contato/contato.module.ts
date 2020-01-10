import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContatoRoutingModule } from './contato.routing.module';
import { ContatoComponent } from './contato.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { cmsService } from '../services/cms.service';
import { ComponentsModule } from '../components/components.modules';


    
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ContatoRoutingModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule
    ],
    exports: [], 
    declarations: [ContatoComponent],
    providers: [cmsService],
})
export class ContatoModule { }

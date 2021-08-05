import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateFormModule } from './template-form/template-form.module';
import { DataFormModule } from './data-form/data-form.module';

@NgModule({
  declarations: [
    AppComponent        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TemplateFormModule, 
    ReactiveFormsModule,
    DataFormModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

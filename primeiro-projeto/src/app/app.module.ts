import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MeuPrimeiroComponent } from './meu-primeiro-sem-cli/meu-primeiro.component';
import { MeuPrimeiroComCliComponent } from './meu-primeiro-com-cli/meu-primeiro-com-cli.component';
import { PrimeiroModuleModule } from './primeiro-module/primeiro-module.module';

@NgModule({
  declarations: [
    AppComponent,
    MeuPrimeiroComponent,
    MeuPrimeiroComCliComponent
  ],
  imports: [ 
    BrowserModule,
    PrimeiroModuleModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }

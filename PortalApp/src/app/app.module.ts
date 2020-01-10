import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HeadBarComponent } from './components/shared/headbar/headbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { MarketingComponent } from './shared/marketing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { NgxMaskModule } from 'ngx-mask'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/pages/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService, AuthServiceConfig } from 'angularx-social-login';
import { socialConfigs, LoginModule } from './login/login.module';
import { PagesModule } from './components/shared/pages/pages.module';
import { FirstNamePipe } from './pipes/firstNamePipe';
import { ContractService } from './checkout/services/contract.service';
import { LoaderInterceptor } from './loader.interceptor';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#fff',
  fgsColor: '#FF7900',
  pbColor: '#FF7900',
  overlayColor: 'rgba(255,255,255,.8)',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.doubleBounce, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 3, // progress bar thickness
};


@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    FooterComponent,
    MarketingComponent,
    FirstNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ScrollToModule.forRoot(),
    NgxMaskModule.forRoot(),
    //  

    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    PagesModule
  ],
  providers: [
    ContractService,
    HeadBarComponent,
    FooterComponent, AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  // exports: [Ng2BRPipesModule],
  bootstrap: [AppComponent]
})
export class AppModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
    }
  }
}

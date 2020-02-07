import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { cmsService } from '../services/cms.service';
import { LoginRoutingModule } from './login.routing.module';

import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { LoginComponent } from './pages/login.component';
import { RegisterUserComponent } from './pages/register-user.component';
import { UserService } from './services/user.service';
import { EmailVerificationComponent } from './pages/email-verification.component';
import { LoginService } from './services/login.service';


export function socialConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('378499659721242')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('235750410861-0s8k9i4ocgfcakeu8b91adgb308nmetb.apps.googleusercontent.com')
            }
        ]
    );
    return config;
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        SlickCarouselModule,
        HttpModule,
        HttpClientModule
    ],
    exports: [LoginComponent],
    declarations: [LoginComponent, RegisterUserComponent, EmailVerificationComponent],
    providers: [
        UserService,
        LoginService,
        AuthService,
        {
            provide: AuthServiceConfig,
            useFactory: socialConfigs
        }
    ],
})
export class LoginModule { }

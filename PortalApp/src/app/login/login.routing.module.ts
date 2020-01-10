import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { RegisterUserComponent } from './pages/register-user.component';
import { EmailVerificationComponent } from './pages/email-verification.component';



const loginRoutes: Routes = [

    { path: '', component: LoginComponent, canActivate: [] },
    { path: 'cadastro', component: RegisterUserComponent, canActivate: [] },

    { path: 'emailconfirmation', component: EmailVerificationComponent },

];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { Page404Component } from './page404/page404.component';
import { LoginEmployeesComponent } from './login-employees/login-employees.component';

@NgModule({
  declarations: [
    Page404Component,
    LoginEmployeesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule
  ],
  exports: [
    Page404Component,
    LoginEmployeesComponent
  ]
})
export class PagesModule { }

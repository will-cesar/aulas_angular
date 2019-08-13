import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentePrimeiroModuloComponent } from './componente-primeiro-modulo/componente-primeiro-modulo.component';

@NgModule({
  declarations: [
    ComponentePrimeiroModuloComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentePrimeiroModuloComponent
  ]
})
export class PrimeiroModuleModule { }

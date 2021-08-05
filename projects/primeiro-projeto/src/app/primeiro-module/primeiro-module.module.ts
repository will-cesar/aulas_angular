import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentePrimeiroModuloComponent } from './componente-primeiro-modulo/componente-primeiro-modulo.component';
import { PrimeiroServicoService } from './primeiro-servico.service';

@NgModule({
  declarations: [
    ComponentePrimeiroModuloComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentePrimeiroModuloComponent
  ],
  providers: [
    PrimeiroServicoService
  ]
})
export class PrimeiroModuleModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { CriarCursoComponent } from './criar-curso.component';
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';

@NgModule({
  declarations: [
    CriarCursoComponent,
    ReceberCursoCriadoComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [AppComponent],
  exports: [CriarCursoComponent]
})
export class CriarCursoModule { }

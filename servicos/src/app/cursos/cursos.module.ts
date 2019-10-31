import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursosService } from './cursos.service';
import { AppComponent } from '../app.component';
import { CursosComponent } from './cursos.component';

@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [AppComponent],
  exports: [CursosComponent]
})
export class CursoModule { }

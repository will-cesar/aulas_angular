import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];
  // cursosServices: CursosService; // sem injeção

  constructor(
    private cursosServices: CursosService // com injeção
    // nesse caso, os métodos de "CursosServices" estão sendo injetados para dentro da classe privada "cursosServices"
  ) { 
    // this.cursosServices = new CursosService(); // sem injeção
    // this.cursosServices = _cursosServices; // com injeção
  }

  ngOnInit() {
    this.cursos = this.cursosServices.getCursos();
  }

}

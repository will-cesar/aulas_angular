import { Component, OnInit } from '@angular/core';
import { PrimeiroServicoService } from '../primeiro-servico.service';

@Component({
  selector: 'app-componente-primeiro-modulo',
  templateUrl: './componente-primeiro-modulo.component.html',
  styleUrls: ['./componente-primeiro-modulo.component.css']
})
export class ComponentePrimeiroModuloComponent implements OnInit {

  nomePortal: string;
  
  cursos: string[] = ['Java', 'Ext JS', 'Angular'];
  cursosService: string[];

  constructor(private primeiroServico: PrimeiroServicoService) {
    this.nomePortal = 'http://loiane.training';   
    
    this.cursosService = this.primeiroServico.getCursos();
  }

  ngOnInit() {
  }

}




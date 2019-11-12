import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id: number;
  inscricao: Subscription; 
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursosService
    ) {
      // this.id = this.route.snapshot.params['id']; ==> método padrão, mas não dinâmico 
    }

  ngOnInit() {
    // this.inscricao = this.route.params.subscribe((params: any) => { // método dinâmico de pegar a url
    //   this.id = params['id'];
    // });
    debugger

    this.inscricao = this.route.params.subscribe((params: any) => { 
        this.id = params['id'];

        this.curso = this.cursoService.getCurso(this.id);

        if (!this.curso) {
          this.router.navigate(['/não-encontrado']);
        }
      });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}

import { Component, OnInit, HostListener } from '@angular/core';
import { cmsService } from '../services/cms.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss', '../app.component.scss'],
  providers: [cmsService]
})
export class ContatoComponent implements OnInit {

  public innerWidth: any;
  imagemDestaque:any;
  listaConteudo:any = [];

  constructor(private cmsService: cmsService) { }

  ngOnInit() {
    if( window.innerWidth < 768){
      this.imagemDestaque = '/assets/images/bg-destaque-contato-mobile.jpg';
    }
    else{
      this.imagemDestaque = '/assets/images/bg-destaque-contato.jpg';
    }
    this.getPageContent();
  }

  getPageContent() {
    this.cmsService.getPageById(318).subscribe(result => this.successLoadPageContent(result), error => this.defaultError());
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }


  successLoadPageContent(result) {

    result.conteudo.map(item => {
      this.listaConteudo.push(item);
    });

  }

  defaultError() {
    
  }

}

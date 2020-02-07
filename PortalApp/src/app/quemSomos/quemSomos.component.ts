import { Component, OnInit } from '@angular/core';
import { cmsService } from '../services/cms.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-quemSomos',
  templateUrl: './quemSomos.component.html',
  styleUrls: ['./quemSomos.component.scss', '../app.component.scss'],
  providers: [cmsService]
})
export class QuemSomosComponent implements OnInit {

  listaConteudo: any = [];

  constructor(private cmsService: cmsService) { }

  ngOnInit() {
    this.getPageContent();
    AppService.changeTextFooter.emit("Faça uma simulação");
  }

  getPageContent() {
    this.cmsService.getPageById(323).subscribe(result => this.successLoadPageContent(result), error => this.defaultError());
  }

  successLoadPageContent(result) {

    result.conteudo.map(item => {
      this.listaConteudo.push(item);
    });

  }

  defaultError() {

  }

}

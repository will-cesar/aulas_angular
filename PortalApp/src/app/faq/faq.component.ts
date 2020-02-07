import { Component, OnInit } from '@angular/core';
import { cmsService } from '../services/cms.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss', '../app.component.scss'],
  providers: [cmsService]
})
export class FAQComponent implements OnInit {

  listaConteudo:any = [];
  public faqHeaderWidth = 100;

  constructor(private cmsService: cmsService) { }

  ngOnInit() {
    this.getPageContent();
  }

  getPageContent() {
    this.cmsService.getPageById(328).subscribe(result => this.successLoadPageContent(result), error => this.defaultError());
    
  }

  successLoadPageContent(result) {

    result.conteudo.map(item => {
      this.listaConteudo.push(item);
    });

  }

  defaultError() {
    
  }

  selectFAQCategory(evt: any, el: HTMLElement) {
    evt.currentTarget.parentNode.querySelector('.active').classList.toggle('active')
    evt.currentTarget.classList.add("active");
    el.querySelector('.active').classList.remove('active');
    el.querySelector("." + evt.currentTarget.classList[1] ).classList.add('active');
  }

  expandRow(evt: any) {
    if (evt.currentTarget.nextElementSibling.classList.contains('show-detail')) {
      evt.currentTarget.nextElementSibling.classList.remove('show-detail');
      evt.currentTarget.nextElementSibling.classList.add('hidden-teste');
      evt.currentTarget.querySelector('span').classList.remove('opened-item');
    } else {
      evt.currentTarget.nextElementSibling.classList.remove('hidden-teste');
      evt.currentTarget.nextElementSibling.classList.add('show-detail');
      evt.currentTarget.querySelector('span').classList.add('opened-item');
    }
  }

}

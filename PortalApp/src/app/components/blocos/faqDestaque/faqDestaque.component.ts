
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Routes, RouterModule, Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, 
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-faqDestaque',
  templateUrl: './faqDestaque.component.html',
  styleUrls: ['./faqDestaque.component.scss'],
  providers: []
})
export class FAQDestaqueComponent implements OnInit {


  public innerWidth: any;
  @Input() idBloco: string;
  @Input() bgBloco: string;
  @Input() titulo: string;
  @Input() corTitulo: string;
  @Input() descricao: string;
  @Input() corDescricao: string;
  @Input() textoCTA: string;
  @Input() textoLinkCTA: string;
  @Input() listaPerguntas:any[];

  

  constructor(private router: Router) { }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
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

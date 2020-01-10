
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Routes, RouterModule, Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, 
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-faqCompleto',
  templateUrl: './faqCompleto.component.html',
  styleUrls: ['./faqCompleto.component.scss'],
  providers: []
})

export class FAQCompletoComponent implements OnInit {

  public faqHeaderWidth = 100;
  public innerWidth: any;
  @Input() titulo: string;
  @Input() corTitulo: string;
  @Input() subtitulo: string;
  @Input() corSubtitulo: string;
  @Input() listaPerguntas:any[];

  

  constructor(private router: Router) { }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
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

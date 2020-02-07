
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, 
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-carrosselVantagens',
  templateUrl: './carrosselVantagens.component.html',
  styleUrls: ['./carrosselVantagens.component.scss'],
  providers: []
})
export class CarrosselVantagensComponent implements OnInit {


  public innerWidth: any;
  vantagemAtiva: any;
  slidesVantagens:any = [];
  @Input() idBloco: string;
  @Input() bgBloco: string;
  @Input() titulo: string;
  @Input() corTitulo: string;
  @Input() descricao: string;
  @Input() textoJuridico: string;
  @Input() corDescricao: string;
  @Input() listaVantagens:any[];
  mediaRepository:any = environment.mediasUrl;

  constructor(private router: Router) { }

  vantagensConfig = {
    "infinite": !0,
    "slidesToScroll": 1,
    "centerPadding": "10px",
    "asNavFor": ".slider-nav",
    "variableWidth": !0,
    "arrows": false,
    "dots":false,
    "responsive": [
      {
        "breakpoint": 480,
        "settings": {
          "centerMode":true ,
          "slidesToShow": 3,
          "slidesToScroll": 1,
          "arrows": false
        }
      }
    ]
  };

  vantagensNavConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "asNavFor": ".slider-for",
    "dots": !1,
    "centerMode": !0,
    "centerPadding": "0px",
    "focusOnSelect": !0,
    "arrows": true,
    "responsive": [
      {
        "breakpoint": 480,
        "settings": {
          "centerMode":false,
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "centerPadding":null,
          "arrows": false,
          "dots": true
        }
      }
    ]
  };


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  slickInit(e) {
    this.vantagemAtiva = this.slidesVantagens[0];
  }

  afterChange(e) {
    this.vantagemAtiva = this.slidesVantagens[e.slick.currentSlide];
  }

  scroll(evt: any, el: HTMLElement) {
    console.log(evt)
    console.log(el)
    el.scrollIntoView({ behavior: 'smooth'});
  }



}

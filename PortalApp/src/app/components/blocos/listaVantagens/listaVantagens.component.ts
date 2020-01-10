
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, 
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-lista-vantagens',
  templateUrl: './listaVantagens.component.html',
  styleUrls: ['./listaVantagens.component.scss'],
  providers: []
})
export class ListaVantagensComponent implements OnInit {


  public innerWidth: any;
  @Input() idBloco: string;
  @Input() bgBloco: string;
  @Input() titulo: string;
  @Input() corTitulo: string;
  @Input() descricao: string;
  @Input() corDescricao: string;
  @Input() listaVantagens:any[];
  mediaRepository:any = environment.mediasUrl;

  

  constructor(private router: Router) { }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }



}

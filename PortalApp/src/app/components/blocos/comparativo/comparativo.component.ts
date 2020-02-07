
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, 
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-comparativo',
  templateUrl: './comparativo.component.html',
  styleUrls: ['./comparativo.component.scss'],
  providers: []
})
export class ComparativoComponent implements OnInit {


  public innerWidth: any;
  @Input() bgBloco: string;
  @Input() titulo: string;
  @Input() corTitulo: string;
  @Input() listaCompra:any[];
  @Input() listaAssinatura:any[];
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

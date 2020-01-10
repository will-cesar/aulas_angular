
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, 
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-destaqueImagem',
  templateUrl: './destaqueImagem.component.html',
  styleUrls: ['./destaqueImagem.component.scss'],
  providers: []
})
export class DestaqueImagemComponent implements OnInit {

  public innerWidth: any;
  mediaRepository:any = environment.mediasUrl;
  @Input() imagemDestaqueMobile: string;
  @Input() imagemDestaqueDesktop: string;
  @Input() tituloDestaque: string;
  @Input() corTituloDestaque: string;
  @Input() subTituloDestaque: string;
  @Input() corSubTituloDestaque: string;
  @Input() descricaoDestaque: string;
  @Input() corDescricaoDestaque: string;
  @Input() startReservation: boolean;
  

  constructor(private router: Router) { }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }



}

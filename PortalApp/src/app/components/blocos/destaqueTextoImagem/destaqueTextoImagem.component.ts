
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, 
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
 import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-destaqueTextoImagem',
  templateUrl: './destaqueTextoImagem.component.html',
  styleUrls: ['./destaqueTextoImagem.component.scss'],
  providers: []
})
export class DestaqueTextoImagemComponent implements OnInit {

  public innerWidth: any;
  mediaRepository:any = environment.mediasUrl;
  videoVisibility: any;

  @Input() idBloco: string;
  @Input() bgBloco: string;
  @Input() bgDesktop: string;
  @Input() bgMobile: string;
  @Input() titulo: string;
  @Input() corTitulo: string;
  @Input() subTitulo: string;
  @Input() corSubTitulo: string;
  @Input() descricao: string;
  @Input() corDescricao: string;
  @Input() hasCTA: boolean;
  @Input() textoCTA: string;
  @Input() videoCTA: string;
  

  constructor(private router: Router, public sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }


  toggleVideo(evt: any) {
    if(!this.videoVisibility){
      this.videoVisibility = 'video-aberto';
    }
    else{
      this.videoVisibility = '';
    }
  }



}

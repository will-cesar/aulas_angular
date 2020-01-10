
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd,
  NavigationEnd, NavigationCancel, NavigationError
} from '@angular/router';

@Component({
  selector: 'app-carrosselPlanos',
  templateUrl: './carrosselPlanos.component.html',
  styleUrls: ['./carrosselPlanos.component.scss'],
  providers: []
})
export class CarrosselPlanosComponent implements OnInit {


  public innerWidth: any;
  @Input() idBloco: string;
  @Input() bgBloco: string;
  @Input() titulo: string;
  @Input() corTitulo: string;
  @Input() subTitulo: string;
  @Input() corSubTitulo: string;
  @Input() listaPlanos: any[];
  mediaRepository: any = environment.mediasUrl;

  constructor(private router: Router) { }

  slideConfigPlanos = {
    "centerMode": true,
    "centerPadding": '0px',
    "slidesToShow": 3,
    "infinite": true,
    "arrows": true,
    "dots": true,
    "responsive": [
      {
        "breakpoint": 769,
        "settings": {
          "centerMode": false,
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": false,
          "arrows": false
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

  goToSimulation(annataid) {
    sessionStorage.setItem('annataId', annataid);
    this.router.navigate(['/simulador']);
  }



}

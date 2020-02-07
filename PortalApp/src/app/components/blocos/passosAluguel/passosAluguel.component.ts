
import { Component, OnInit, Renderer2, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router, Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, 
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-passosAluguel',
  templateUrl: './passosAluguel.component.html',
  styleUrls: ['./passosAluguel.component.scss'],
  providers: []
})
export class PassosAluguelComponent implements OnInit {


  public innerWidth: any;
  @Input() postName: string;
  @Input() bgBloco: string;
  @Input() corTituloBloco: string;
  @Input() tituloBloco: string;
  @Input() layoutBloco: string;
  @Input() corTitulos: string;
  @Input() corTextos: string;
  @Input() tituloPasso1: string;
  @Input() textoPasso1: string;
  @Input() tituloPasso2: string;
  @Input() textoPasso2: string;
  @Input() tituloPasso3: string;
  @Input() textoPasso3: string;
  @Input() tituloPasso4: string;
  @Input() textoPasso4: string;

  

  constructor(private router: Router) { }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }



}

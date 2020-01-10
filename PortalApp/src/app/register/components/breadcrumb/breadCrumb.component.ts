import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-breadCrumb',
  templateUrl: './breadCrumb.component.html',
  styleUrls: ['./breadCrumb.component.scss'],
  providers: []
})
export class BreadCrumbComponent implements OnInit {

  @Input() breadCrumbStatus: string;
  @Input() step1Status: string;
  @Input() step2Status: string;
  @Input() step3Status: string;
  @Input() step4Status: string;
  @Input() finalizacaoSimulador: string;

  constructor() { }

  ngOnInit() {

  }


}

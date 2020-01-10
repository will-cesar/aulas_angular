import { Component, OnInit, HostListener, Input } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-breadCrumb',
  templateUrl: './breadCrumb.component.html',
  styleUrls: ['./breadCrumb.component.scss'],
  providers: []
})
export class BreadCrumbComponent implements OnInit {

  breadCrumbVisibility: any;
  @Input() breadCrumbStatus: string;
  @Input() step1Status: string;
  @Input() step2Status: string;
  @Input() step3Status: string;
  @Input() step4Status: string;
  @Input() finalizacaoSimulador: string;
  @Input() hasBanner: string;

  constructor() { }

  ngOnInit() {
    this.breadCrumbVisibility = true;
    AppService.changeBreadCrumbVisibility.subscribe(result => {
      this.breadCrumbVisibility = result
    });
  }


}

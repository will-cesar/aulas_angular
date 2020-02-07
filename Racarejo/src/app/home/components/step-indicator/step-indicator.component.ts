import { map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  templateUrl: './step-indicator.component.html',
  styleUrls: ['step-indicator.scss'],
})

export class StepIndicatorComponent implements OnInit {
  @Input() step: number;
  constructor() { 
  }

  ngOnInit() {

  }
  

}

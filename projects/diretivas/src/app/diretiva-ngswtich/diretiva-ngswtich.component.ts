import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngswtich',
  templateUrl: './diretiva-ngswtich.component.html',
  styleUrls: ['./diretiva-ngswtich.component.scss']
})
export class DiretivaNgswtichComponent implements OnInit {

  aba: string = 'home';

  constructor() { }

  ngOnInit() {
  }

}

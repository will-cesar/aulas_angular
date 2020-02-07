import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { SimulationService } from '../services/simulation.service';
import { SimulationParameters, KilometerLimit, Time } from '../models/simulationParameters.model';
import { SimulationSession } from '../models/simulationSession.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
  providers: []
})
export class ConfiguracoesComponent implements OnInit {


  simulationParameters: SimulationParameters = null;
  selectedTime: Time = null;
  selectedKilometer: KilometerLimit = null;
  session: SimulationSession;
  innerWidth: number;
  carModelYear: string;

  constructor(private simulationService: SimulationService, private router: Router) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 768) {
      AppService.changeFooterVisibility.emit(false)
      AppService.changeHeaderBackground.emit('#f7f7f7')
    }

    this.simulationService.getParameters().subscribe(result => {
      
      this.simulationParameters = result
      if (this.session.dealdlineTime == 24) {
        this.simulationParameters.kilometerLimits = [{ id: 1, limit: 1000, name: "Mil", }, { id: 2, limit: 1500, name: "Mil" }];
        this.simulationParameters.maxKm = 1500;
        if(this.session.kmLimit == 2000){
          this.session.kmLimit = 1500
        }
      } else {
        this.simulationParameters.maxKm = 2000;
        this.simulationParameters.kilometerLimits = [{ id: 1, limit: 1000, name: "Mil", }, { id: 2, limit: 1500, name: "Mil" }, { id: 3, limit: 2000, name: "Mil" }];
      }
    
    });
    this.session = this.simulationService.getSimulationSession();
    if (!this.session || !this.session.selectedClass) {
      this.router.navigate(['/simulador']);
    }
    else {
      this.session.actualStep = 2;
      // this.simulationService.postSimulationSessionObj(this.session);
    }

    this.getModelCar();

    

    this.simulationService.postSimulationSessionObj(this.session);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 767) {
      AppService.changeFooterVisibility.emit(true)
      AppService.changeHeaderBackground.emit('#ffffff')
    }
    else {
      AppService.changeFooterVisibility.emit(false)
      AppService.changeHeaderBackground.emit('#f7f7f7')
    }
  }

  selectTime(time: any, element: any) {
    this.selectedTime = time.timeDeadLine;
    Array.from(document.querySelectorAll('.months')).forEach(element => {
      element.classList.remove('active')
    });
    if (time.timeDeadline == 24) {
      this.simulationParameters.kilometerLimits = [{ id: 1, limit: 1000, name: "Mil", }, { id: 2, limit: 1500, name: "Mil" }];
      this.simulationParameters.maxKm = 1500;
      if(this.session.kmLimit == 2000){
        this.session.kmLimit = 1500
      }
    } else {
      this.simulationParameters.maxKm = 2000;
      this.simulationParameters.kilometerLimits = [{ id: 1, limit: 1000, name: "Mil", }, { id: 2, limit: 1500, name: "Mil" }, { id: 3, limit: 2000, name: "Mil" }];
    }

    element.currentTarget.classList.add('active');
    this.session.dealdlineTime = time.timeDeadline;
    this.simulationService.postSimulationSessionObj(this.session);
  }

  selectKm(km: any) {
    this.selectedKilometer = km;
    this.session.kmLimit = km;
    this.simulationService.postSimulationSessionObj(this.session);
  }

  getModelCar() {
    let result = JSON.parse(sessionStorage.getItem('simulation.session'));
    this.carModelYear = `${result.selectedClass.modelYear} - ${result.selectedClass.brand} ${result.selectedClass.class}`;
  } 
}

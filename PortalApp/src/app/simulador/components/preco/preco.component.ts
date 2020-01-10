import { Component, OnInit, HostListener, Input } from '@angular/core';
import { SimulationService } from '../../services/simulation.service';
import { SimulationSession } from '../../models/simulationSession.model';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { SimulationPriceRequest } from '../../models/requests/simulationPriceRequest.model';
import { SimulationPrice } from '../../models/simulationPrice.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-preco',
    templateUrl: './preco.component.html',
    styleUrls: ['./preco.component.scss'],
    providers: []
})
export class PrecoComponent implements OnInit {

    simulationSession: SimulationSession;
    simulationPriceRequest: SimulationPriceRequest;
    simulationPrice: SimulationPrice;
    priceChanging: boolean;

    constructor(private simulationService: SimulationService, private router: Router) { }

    ngOnInit() {
        this.getSimulationSession();

        AppService.updatePriceSession.subscribe(result => {
            this.getSimulationSession();
        });
    }

    getSimulationSession() {
        this.priceChanging = true;
        this.simulationSession = this.simulationService.getSimulationSession();
        if (this.simulationSession) {
            this.simulationPriceRequest
                = {
                    modelId: this.simulationSession.selectedClass.modelId,
                    kmLimit: this.simulationSession.kmLimit,
                    timeDeadline: this.simulationSession.dealdlineTime,
                    typeOfColor: this.simulationSession.colorType,

                }


            this.simulationService.getSimulationPrice(this.simulationPriceRequest).subscribe(result => this.success(result));
        }
    }

    success(result) {
        console.log(result);
        this.simulationPrice = result;
        this.priceChanging = false;
        sessionStorage.setItem(environment.simulationPriceSession, JSON.stringify(this.simulationPrice));
    }

    nextStep() {
        if (this.simulationSession.actualStep == 1) {
            this.simulationSession.actualStep = 2;
            this.simulationService.postSimulationSessionObj(this.simulationSession);
            this.router.navigate(['/simulador/configuracoes']);
        }
        else if (this.simulationSession.actualStep == 2) {
            this.router.navigate(['/simulador/resumo']);
        }
    }


}

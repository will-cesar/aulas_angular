import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SimulationSession } from '../models/simulationSession.model';
import { SimulationPrice } from '../models/simulationPrice.model';
import { SimulationPriceRequest } from '../models/requests/simulationPriceRequest.model';
import { SimulationParameters } from '../models/simulationParameters.model';
import { VehicleClass, VehicleModel } from '../models/vehiclesClass.model';
import { AppService } from 'src/app/app.service';
import { SimulationDataRequest } from '../models/requests/simulationDataRequest.model';
import { Dealership } from '../models/dealership.model';
import { GenerateContract } from 'src/app/checkout/models/generateContract.model';
@Injectable({
    providedIn: 'root'
})
export class SimulationService {

    private readonly API: string;

    constructor(private http: HttpClient) {
    }

    getVehicleClassList() {
        return this.http.get(`${environment.apiUrl}api/VehicleClass/`).pipe(take(1));
    }

    getParameters() {
        return this.http.get<SimulationParameters>(`${environment.apiUrl}api/simulation/parameters`).pipe(take(1));
    }

    postSimulationSession(selectedClass: VehicleModel, actualStep: number, dealdlineTime?: number, kmLimit?: number, guaranteeDeposit?: number, totalValue?: number,
        numberOfInstallments?: number, installmentAmount?: number) {


        var simulationSession = {

            "actualStep": actualStep,
            "dealdlineTime": dealdlineTime,
            "kmLimit": kmLimit,
            "guaranteeDeposit": guaranteeDeposit,
            "totalValue": totalValue,
            "numberOfInstallments": numberOfInstallments,
            "installmentAmount": installmentAmount,
            "selectedClass": selectedClass
        }
        sessionStorage.setItem(environment.simulationSession, JSON.stringify(simulationSession));

        AppService.updatePriceSession.emit();
    }

    postSimulationSessionObj(simulationSession: SimulationSession) {
        sessionStorage.setItem(environment.simulationSession, JSON.stringify(simulationSession));

        AppService.updatePriceSession.emit();
    }
    getSimulationSession() {
        var json = JSON.parse(sessionStorage.getItem(environment.simulationSession));
        return json;
    }

    getSimulationPrice(request: SimulationPriceRequest) {
        return this.http.post<SimulationPrice>(`${environment.apiUrl}api/simulation/price`, request).pipe(take(1));
    }

    postSimulationDataEmail(request: SimulationDataRequest) {
        return this.http.post(`${environment.apiUrl}api/simulation/simulationData`, request).pipe(take(1));
    }

    getDealership() {
        return this.http.get<Dealership>(`${environment.apiUrl}api/Dealership`).pipe(take(1));
    }

    generateContract(data: GenerateContract) {
        return this.http.post(`${environment.apiUrl}api/Contract/`, data).pipe(take(1));
    }

}

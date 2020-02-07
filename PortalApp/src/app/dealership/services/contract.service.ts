
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/app/register/models/user.model';
import { ContractResponse } from 'src/app/checkout/models/contractResponse.model';
import { GenerateContract } from 'src/app/checkout/models/generateContract.model';



@Injectable({
    providedIn: 'root'
})
export class ContractService {


    private readonly API = `${environment.apiUrl}api/contract/`;
    constructor(private http: HttpClient) {

    }

    getContractById(id: any) {
        return this.http.get<ContractResponse>(`${environment.apiUrl}api/Contract/` + id).pipe(take(1));
    }

    getContracts(userId: any) {
        return this.http.get<ContractResponse>(`${environment.apiUrl}api/Contract/contracts/` + userId).pipe(take(1));
    }

    getContractsByDealership(idDealership: any) {
        return this.http.get<ContractResponse>(`${environment.apiUrl}api/Contract/contractsByDealership/` + idDealership).pipe(take(1));
    }

    generate(data: GenerateContract) {
        return this.http.post(`${environment.apiUrl}api/Contract/`, data).pipe(take(1));
    }


}

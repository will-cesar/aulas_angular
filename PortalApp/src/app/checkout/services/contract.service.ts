import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContractResponse } from '../models/contractResponse.model';
import { GenerateContract } from '../models/generateContract.model';

@Injectable({
    providedIn: 'root'
})

export class ContractService {

    private readonly API: string;

    constructor(private http: HttpClient) {
    }

    getContractById(id: any) {
        return this.http.get<ContractResponse>(`${environment.apiUrl}api/Contract/` + id).pipe(take(1));
    }

    getContracts(userId: any) {
        return this.http.get(`${environment.apiUrl}api/Contract/contracts/` + userId).pipe(take(1));
    }

    generate(data: GenerateContract) {
        return this.http.post(`${environment.apiUrl}api/Contract/`, data).pipe(take(1));
    }

    getPendingDocuments(idContract) {
        return this.http.get(`${environment.apiUrl}api/Contract/pendingDocuments/` + idContract).pipe(take(1));
    }
    getAttachedDocuments(idContract) {
        return this.http.get(`${environment.apiUrl}api/Contract/getAttachedDocuments/` + idContract).pipe(take(1));
    }

    postPendingDocuments(data: any) {
        return this.http.post(`${environment.apiUrl}api/Contract/uploadPendingDocuments`, data).pipe(take(1));
    }

    putSigned(id) {

        return this.http.post(`${environment.apiUrl}api/Contract/signedContract`, { idContract: id }).pipe(take(1));
    }
}


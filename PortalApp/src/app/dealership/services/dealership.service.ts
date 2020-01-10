
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
export class DealershipService {


    private readonly API = `${environment.apiUrl}api/dealership/`;
    constructor(private http: HttpClient) {

    }

    changePassword(data: any) {
        return this.http.post(this.API + 'changePassword', data).pipe(take(1));
    }


}

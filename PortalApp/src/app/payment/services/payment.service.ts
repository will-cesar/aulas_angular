
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/app/register/models/user.model';
import { ContractResponse } from 'src/app/checkout/models/contractResponse.model';
import { PaymentCCRequest } from '../models/paymentRequest.model';


@Injectable({
    providedIn: 'root'
})
export class PaymentService {


    private readonly API = `${environment.apiUrl}api/contract/`;
    constructor(private http: HttpClient) {

    }

    post(data) {
        return this.http.post(`${environment.apiUrl}api/contract/` + "smsContract", data).pipe(take(1));
    }

    postGuaranteeDepositPayment(data: PaymentCCRequest) {
        return this.http.post(`${environment.apiUrl}api/payment/` + "guaranteeDepositPayment", data).pipe(take(1));
    }
    postGuaranteeDepositPaymentBillet(data) {
        return this.http.post(`${environment.apiUrl}api/payment/` + "guaranteeDepositPaymentBillet", data).pipe(take(1));
    }

    postInstallmentPayment(data: PaymentCCRequest) {
        return this.http.post(`${environment.apiUrl}api/payment/` + "installmentPayment", data).pipe(take(1));
    }

    postInstallmentPaymentBillet(data) {
        return this.http.post(`${environment.apiUrl}api/payment/` + "installmentPaymentBillet", data).pipe(take(1));
    }

    changeInstallmentPaymentBillet(data) {
        return this.http.post(`${environment.apiUrl}api/payment/` + "changeInstallmentPaymentBillet", data).pipe(take(1));
    }
    changeInstallmentPayment(data) {
        return this.http.post(`${environment.apiUrl}api/payment/` + "changeInstallmentPayment", data).pipe(take(1));
    }

    samePayment(data) {
        return this.http.post(`${environment.apiUrl}api/payment/` + "samePaymentMethod", data).pipe(take(1));
    }
}

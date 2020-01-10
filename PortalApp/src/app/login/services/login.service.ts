
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../../register/models/user.model';
import { AppService } from '../../app.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly API = `${environment.apiUrl}api/Login/`;
    constructor(private http: HttpClient) {

    }

    postWithFacebook(data) {
        var loginWithFacebookObj = {
            email: data.email,
            idFacebook: data.id
        };
        return this.http.post(this.API + 'facebook', loginWithFacebookObj);
    }


    postWithGoogle(data) {
        var loginWithGoogleObj = {
            email: data.email,
            idGoogle: data.id
        };
        return this.http.post(this.API + 'google', loginWithGoogleObj);
    }

    post(data) {
        return this.http.post(this.API, data).pipe(take(1));
    }

    postDealership(data) {
        return this.http.post(`${environment.apiUrl}api/dealership/login`, data).pipe(take(1));
    }

    postLoggedUserSession(user: any) {
        localStorage.setItem(environment.loggedUserSession, JSON.stringify(user));
    }

    getLoggedUserSession() {
        var json = JSON.parse(localStorage.getItem(environment.loggedUserSession));
        AppService.getUserInfos.emit(json);
        return json;
    }

    removeLoggedUserSession() {
        localStorage.removeItem(environment.loggedUserSession);
        localStorage.removeItem(environment.token);
        localStorage.removeItem(environment.tokenExpires);
    }

    postWithCode(data) {
        return this.http.post(this.API + 'code', data).pipe(take(1));
    }
}

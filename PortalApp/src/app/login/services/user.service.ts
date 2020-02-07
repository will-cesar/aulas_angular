
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/app/register/models/user.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {


    private readonly API = `${environment.apiUrl}api/User/`;
    constructor(private http: HttpClient) {

    }

    getPaginated(data) {
        return this.http.post(this.API + "paged/", data).pipe(map(resp => resp));
    }

    // list() {
    //     return this.http.get<User[]>(this.API).pipe(take(1));
    // }

    // get() {
    //     return this.http.get(this.API).pipe(take(1));
    // }

    postWithFacebook(data) {
        return this.http.post(this.API + "facebook", data).pipe(take(1));
    }
    post(data) {
        return this.http.post(this.API, data).pipe(take(1));
    }

    postStepOne(user: User) {
        return this.http.post(this.API + "/registerStepOne", user).pipe(take(1));
    }

    confirmEmail(data) {
        return this.http.post(this.API + "emailConfirmation", data).pipe(take(1));
    }

    getById(id) {
        return this.http.get<User>(this.API + id).pipe(take(1));
    }

    putNewPass(data) {
        return this.http.put(this.API + "changePassword", data).pipe(take(1));
    }

    alterPass(data, id){
        return this.http.put(this.API + "updateUserPassword/" + id, data).pipe(take(1));
    }
    

    resetPassword(data){
        return this.http.post(this.API + "/resetPassword", data).pipe(take(1));
    }


    // getById(id) {
    //     return this.http.get<User>(this.API + id).pipe(take(1));
    // }

    // getByEmail(email) {
    //     return this.http.get(`${environment.serviceUrl}api/user/email/${email}`);
    // }

    // delete(id) {
    //     return this.http.delete(this.API + id);
    // }

    // put(data) {
    //     return this.http.put(this.API + data.idUser, data).pipe(take(1));
    // }

    // save(data) {
    //     if (data.idUser) {
    //         return this.put(data);
    //     }
    //     else {
    //         return this.post(data);
    //     }
    // }


}

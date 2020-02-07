
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/app/register/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {


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

  postStepOne(user: any) {
    return this.http.post(this.API + "/registerStepOne", user).pipe(take(1));
  }

  postStepTwo(user: User) {
    return this.http.post(this.API + "/registerStepTwo", user).pipe(take(1));
  }

  postStepThree(user: User) {
    return this.http.post(this.API + "/registerStepThree", user).pipe(take(1));
  }

  postStepFour(user: User) {
    return this.http.post(this.API + "/registerStepFour", user).pipe(take(1));
  }

  postUserSession(user: User) {
    sessionStorage.setItem(environment.userRegisterSession, JSON.stringify(user));
  }

  getById(id) {
    return this.http.get<User>(this.API + id).pipe(take(1));
  }

  postResendEmail(data) {
    return this.http.post(this.API + "resendPasswordEmail", data).pipe(take(1));
  }

  getUserSession() {
    var json = JSON.parse(sessionStorage.getItem(environment.userRegisterSession));
    return json;
  }

  confirmEmail(data) {
    return this.http.post(this.API + "emailConfirmation", data).pipe(take(1));
  }

  getLoggedUser() {
    return this.http.get(this.API + "/getLogged").pipe(take(1));
  }

  updateUserData(data, id) {
    return this.http.put(this.API + "updateUserData/" + id, data).pipe(take(1));
  }

  updateUserDocuments(data, id) {
    return this.http.put(this.API + "updateusercnhdata/" + id, data).pipe(take(1));
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

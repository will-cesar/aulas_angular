import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = `${environment.serviceUrl}api/User/`;

  constructor(private http: HttpClient) { }

  getById(id) {
    return this.http.get(this.API + id).pipe(take(1));
  }

  forgetPassword(email){
    return this.http.put(`${this.API}passwordreset/email/${email}`, null);    
  }
}

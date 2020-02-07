import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly API = `${environment.serviceUrl}api/Vehicle/`;

  constructor(private http: HttpClient) { } 

  post(data){
    return this.http.post(this.API, data);
  }

  finishForm(idForm){
    return this.http.get(`${this.API}/FinishForm/${idForm}`);    
  }

  getById(idForm){
    return this.http.get(`${this.API}${idForm}`);    
  }
}

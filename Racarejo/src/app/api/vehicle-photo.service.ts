import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiclePhotoService {
  private readonly API = `${environment.serviceUrl}api/VehiclePhoto/`;

  constructor(private http: HttpClient) { }

  post(data): Observable<any> {
    return this.http.post(this.API, data);
  }

}

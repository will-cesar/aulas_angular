import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class simulationService {

  private readonly API: string;

  constructor(private http: HttpClient) {
  }

    getVehicleClassList() {
        return this.http.get(`${environment.apiUrl}api/VehicleClass/`).pipe(take(1));
    }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class dashboardService {

    private readonly API: string;

    constructor(private http: HttpClient) { }

    postNotificationStatus(data) {
        return this.http.post(`${environment.apiUrl}api/User/readNotification`, data).pipe(take(1));
    }

}

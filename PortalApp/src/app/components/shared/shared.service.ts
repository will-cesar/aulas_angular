
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../../register/models/user.model';
import { AppService } from '../../app.service';


@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private http: HttpClient) {

    }

    postCollaborator(data) {
        var url = `${environment.apiUrl}api/Collaborator/`;
        return this.http.post(url, data).pipe(take(1));
    }

    getPages() {
        return this.http.get(`${environment.serviceUrl}wp-json/acf/v3/pages/`).pipe(take(1));
    }

    getFooter() {
        const headers = new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
          "Access-Control-Allow-Origin": "*",
          'content-type': 'application/json'
        });
        return this.http.get(`${environment.serviceUrl}wp-json/wp/v2/pages/704`,
          {headers: headers}
          );
    }
}

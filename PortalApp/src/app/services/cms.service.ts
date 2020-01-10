import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class cmsService {

  private readonly API: string;

  constructor(private http: HttpClient) {
  }

    getPages() {
        return this.http.get(`${environment.serviceUrl}wp-json/acf/v3/pages/`).pipe(take(1));
    }

    getPageById(id) {
        return this.http.get(`${environment.serviceUrl}wp-json/wp/v2/pages/${id}`).pipe(take(1));
    }

    getFooter() {
        const headers = new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
          'content-type': 'application/json',
          'Access-Control-Allow-Origin' : 'https://wprcihml.azurewebsites.net',
          'Access-Control-Allow-Methods' : 'GET',
          'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent',
        });
        return this.http.get(`${environment.serviceUrl}wp-json/wp/v2/pages/704`,
          {headers: headers}
          );
    }

    // getFooter(){
    //     return this.http.get(`${environment.serviceUrl}wp-json/wp/v2/pages/704`).pipe(take(1));
    // }

    getComponents() {
        return this.http.get(`${environment.serviceUrl}componentes/`);
    }

    sendTalkWithUsForm(data){
        return this.http.post(`${environment.talkWithUsUrl}`, data).pipe(take(1));
    }



}

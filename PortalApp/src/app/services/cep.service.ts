import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';


@Injectable()
export class CepService {

    constructor(private http: Http) {
    }

    get(cep) {
        return this.http.get('https://viacep.com.br/ws/' + cep + '/json').pipe(map(r => r.json()));
    }

}



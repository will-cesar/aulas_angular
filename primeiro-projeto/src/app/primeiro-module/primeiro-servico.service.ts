import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimeiroServicoService {

  constructor() { }

  getCursos() {
    return ['PHP', 'Js', 'React'];
  }
}

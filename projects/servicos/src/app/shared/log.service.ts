import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  consolelog(msg: string) {
    console.log(msg);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  constructor() { }
  log(msg: string) {
    console.log(msg);
  }

  error(msg: string) {
    console.error(msg);
  }
}

import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Logger, ToastService} from '../../core';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private baseUrl = environment.restApi;
  private examensUrl = `${this.baseUrl}examens`;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private toastService: ToastService) {
  }
  findAll(): Observable<any> {
    this.logger.log(this.examensUrl);
    return this.http
      .get<any>(this.examensUrl)
      .pipe(
        map( response => {
          return  response._embedded.examens;
        } ),
        tap(_ => this.notify('fetched Examens', 'GET')),
        catchError(this.handleError('findAll', 'GET')),
      );
  }

  protected handleError(operation: string, method: string) {
    return function errorHandler(res: HttpErrorResponse) {
      this.logger.error(res);
      const eMsg = res.message || '';
      const error = `${this.entityNamePlural} ${operation} Error${
        eMsg ? ': ' + eMsg : ''
      }`;
      this.notify(error, method);
    }.bind(this);
  }

  protected notify(message: string, method: string) {
    this.toastService.openSnackBar(message, method);
  }
}

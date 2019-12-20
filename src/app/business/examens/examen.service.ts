import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Logger, ToastService} from '../../core';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Examen} from './examen';

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

  findById(id: string): Observable<any> {
    const url = `${this.examensUrl}/${id}`;
    return this.http
      .get<Examen>(url)
      .pipe(
        tap(_ => this.notify(`fetched examen id=${id}`, 'GET')),
        catchError(this.handleError(`getOne id=${id}`, 'GET'))
      );
  }

  save(examen: Examen): Observable<any> {
    return this.http
      .post<Examen>(this.examensUrl, examen)
      .pipe(
        tap((e: Examen) => this.notify(`added  w/ id=${e.id}`, 'POST')),
        catchError(this.handleError('add', 'POST'))
      );
  }

  update(examen: Examen): Observable<any> {
    return this.http
      .put<Examen>(`${this.examensUrl}/${examen.id}`, examen)
      .pipe(
        tap(_ => this.notify(`updated examen id=${examen.id}`, 'PUT')),
        catchError(this.handleError('update', 'PUT'))
      );
  }

  delete(examen: Examen | number): Observable<any> {
    const id = typeof examen === 'number' ? examen : examen.id;
    const url = `${this.examensUrl}/${id}`;
    return this.http
      .delete<Examen>(url)
      .pipe(
        tap(_ => this.notify(`deleted examen id=${id}`, 'DELETE')),
        catchError(this.handleError('delete', 'DELETE'))
      );
  }
  deleteCandidatExamen(idCondidat): Observable<any> {
    return this.http
      .delete<Examen>(`${this.examensUrl}/${idCondidat}`)
      .pipe(
        tap(_ => this.notify(`deleted examen id=${idCondidat}`, 'DELETE')),
        catchError(this.handleError('delete', 'DELETE'))
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

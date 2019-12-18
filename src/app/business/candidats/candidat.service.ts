import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Candidat} from './candidat';
import {Observable} from 'rxjs';
import {ToastService, Logger} from '../../core';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTION',
      'Access-Control-Allow-Headers': '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private baseUrl = environment.restApi;
  private candidatsUrl = `${this.baseUrl}candidats`;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private toastService: ToastService) {
  }

  /**
   * GET: get all candidats from the database
   */
  getCandidats(): Observable<any> {
    this.logger.log(this.candidatsUrl);
    return this.http
      .get<any>(this.candidatsUrl)
      .pipe(
        map( response => {
          // console.log(response._embedded.candidats);
          return  response._embedded.candidats;
        } ),
        tap(_ => this.notify('fetched candidats', 'GET')),
        catchError(this.handleError('getCandidats', 'GET')),
      );
  }

  /**
   * GET: get an existing candidat from the database by an id
   */
  getCandidat(id: number): Observable<any> {
    const url = `${this.candidatsUrl}/${id}`;
    return this.http
      .get<Candidat>(url)
      .pipe(
        tap(_ => this.notify(`fetched candidat id=${id}`, 'GET')),
        catchError(this.handleError(`getCandidat id=${id}`, 'GET'))
      );
  }

  addCandidat(candidat: Candidat): Observable<any> {
    return this.http
      .post<Candidat>(this.candidatsUrl, candidat)
      .pipe(
        tap((c: Candidat) => this.notify(`added candidats w/ id=${c.id}`, 'POST')),
        catchError(this.handleError('addCandidat', 'POST'))
      );
  }

  updateCandidat(candidat: Candidat): Observable<any> {
    return this.http
      .put(this.candidatsUrl, candidat)
      .pipe(
        tap(_ => this.notify(`updated candidat id=${candidat.id}`, 'PUT')),
        catchError(this.handleError('updateCandidat', 'PUT'))
      );
  }

  deleteCandidat(candidat: Candidat | number): Observable<any> {
    const id = typeof candidat === 'number' ? candidat : candidat.id;
    const url = `${this.candidatsUrl}/${id}`;
    return this.http
      .delete<Candidat>(url, httpOptions)
      .pipe(
        tap(_ => this.notify(`deleted candidat id=${id}`, 'DELETE')),
        catchError(this.handleError('deleteCandidat', 'DELETE'))
      );
  }
  loadCandidatsExamen(idExamen: string): Observable<any>  {
    const url = `${this.candidatsUrl}/${idExamen}`;
    return this.http
      .get<Candidat>(url, httpOptions)
      .pipe(
        tap(_ => this.notify('fetched candidats', 'GET')),
        catchError(this.handleError('getCandidats', 'GET')),
      );
  }
  /**
   * Prepare an error handler for failed HTTP requests.
   * That handler extracts the error message and logs it.
   * It also adds the message to the errors$ observable to which the caller
   * may listen and react.
   * @param operation The name/description of the operation that failed
   * @param method The HTTP method for the failed HTTP request
   */
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

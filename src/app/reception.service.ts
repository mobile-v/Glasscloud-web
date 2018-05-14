import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Reception} from './reception';
import {AuthService} from './auth.service';


@Injectable({providedIn: 'root'})
export class ReceptionService implements OnInit {

  private receptionUrl = 'http://localhost:8080/api/receptionOfOrder';

  constructor(
    private http: HttpClient, private as: AuthService
  ) {
  }

  ngOnInit() {
  }

  getCurrentReception(): Observable<Reception[]> {
    return this.http.get<Reception[]>(this.receptionUrl + '/current')
      .pipe(
        catchError(this.handleError('getCurrentReception', []))
      );
  }

  getReceptions(): Observable<Reception[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-XSRF-TOKEN': this.as.getCookie(this.as.COOKIE_CONSENT),
        'Authorization': this.as.getCookie('Authorization'),
      }),
      withCredentials: true
    };
    return this.http.get<Reception[]>(this.receptionUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getReceptions', []))
      );
  }

  selectReception(id: number): Observable<boolean[]> {
    return this.http.get<boolean[]>(this.receptionUrl + '/select/' + id)
      .pipe(
        catchError(this.handleError(' select Reception', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
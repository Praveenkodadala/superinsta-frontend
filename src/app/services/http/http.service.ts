import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = '/api';
  private token: string | null = null;
  public userData: any | null = null;


  constructor(private http: HttpClient, private storageService: StorageService) {
    this.token = this.storageService.getLocalStorage('auth-token');
   
  }

  private handleAuthorizationToken(headers: HttpHeaders): void {
    const accessToken = headers.get('Authorization');    //access token
    if (accessToken) {
      //this.token = authorizationHeader.replace('Bearer ', '');
      this.storageService.setLocalStorage('auth-token', accessToken);  
    }
  }

  private createHttpHeaders(includeContentType: boolean): HttpHeaders {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*', // Include only for cross-origin requests
      'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
    });

    if (includeContentType) {
      headers = headers.set('Content-Type', 'application/json');
    }

    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred. Please try again later.';
    switch (error.status) {
      case 0:
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      default:
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        break;
    }
    console.error('HTTP error:', error);
    return throwError(errorMessage);
  }



  public doHttpJson(request: { method: string; action_url: string; params?: any }): Observable<any> {
    const includeContentType = false
    const options = this.createHttpHeaders(includeContentType); //'Content-Type', 'application/json'--> true
   
    return this.http.request(request.method, this.baseUrl + request.action_url, {
      body: request.params,
      observe: 'response',
      responseType: 'json',
      headers: options,
    }).pipe(
      tap((response) => this.handleAuthorizationToken(response.headers)),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  public doHttpFormData(request: { method: string; action_url: string; params?: FormData }): Observable<any> {
    const includeContentType = false
    const options = this.createHttpHeaders(includeContentType);   //'Content-Type', 'application/json'--> false
    return this.http.request(request.method, this.baseUrl + request.action_url, {
      body: request.params,
      observe: 'response',
      headers: options,
    }).pipe(
      tap((response) => this.handleAuthorizationToken(response.headers)),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

}

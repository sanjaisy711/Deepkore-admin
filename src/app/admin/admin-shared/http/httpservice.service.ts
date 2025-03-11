import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  private ApiURL: string;

  constructor(private http: HttpClient) { 
    this.ApiURL = environment.BaseURL;

  }
  
  get(url: string, options?: {}): Observable<any> {
    const headers = new HttpHeaders()
   .set('content-type', 'application/json')
   .set('Access-Control-Allow-Origin', '*')
   .set('Accept', 'application/json');
    return this.http.get(this.ApiURL + url,{ 'headers': headers }).pipe(
      catchError(error => {
        //this.handleError(error)
        return throwError(error);
      })
    );
  }

  put(url: string, body: Object = {}, options?: {}): Observable<any> {
    return this.http.put(this.ApiURL + url,
      JSON.stringify(body), options
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  post<T>(url: string, body: Object = {}, options?: {}): Observable<any> {
    return this.http.post<any>(this.ApiURL + url,
      body,options
    ).pipe(
      catchError(error => {
        //this.handleError(error)
        return throwError(error);
      })
    );
  }
  patch<T>(url: string, body: Object = {}, options?: {}): Observable<any> {
  
    return this.http.patch<any>(this.ApiURL + url,
      body,options
    ).pipe(
      catchError(error => {
        //this.handleError(error)
        return throwError(error);
      })
    );
  }
  delete<T>(url: string, body: Object = {}): Observable<any> {
    return this.http.delete<any>(this.ApiURL + url,
      body
    ).pipe(
      catchError(error => {
        //this.handleError(error)
        return throwError(error);
      })
    );
  }
}

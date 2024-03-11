import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  HttpHeadersInterface } from './http-interfaces';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  gettax() {
    return this.http.get<any[]>(`${this.apiUrl}tax`, {
      //params: { page: 1 },
    });
  }
  registertax(registertax: any): Observable<any> {
    console.warn(registertax)
    return this.http.post<any>(`${this.apiUrl}tax`, registertax);
  }
}









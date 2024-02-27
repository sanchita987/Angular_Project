import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeadersInterface } from './http-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeadersInterface {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return headers;
  }

  getPosts(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/dashboard/plan_summary', { headers });
  }
  
  getsubs(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/dashboard/subscription_summary', { headers });
  }

  getsign(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/dashboard/signups', { headers });
  }

  getstat(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/dashboard/statistics', { headers });
  }
}
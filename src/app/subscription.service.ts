import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessTokenInterface, HttpHeadersInterface } from './http-interfaces';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/subscription';
  private url = 'https://nitvcrmapi.truestreamz.com/api/v1/customer';

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeadersInterface {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return headers;
  }
  getsubscription(search:string,filter:string): Observable<any> {
    const params = new HttpParams()
    .set('search', search)
    .set('filter', filter);
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/subscription', {params: params,
      //params: { page: 1 },
      headers : this.getHeaders() 
    });
  }
registerSubscription(registerSubscription: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, registerSubscription, { headers: this.getHeaders() });
}
getCusto(): Observable<any> {
  return this.http.get<any>(this.url, { headers: this.getHeaders() });
}

}


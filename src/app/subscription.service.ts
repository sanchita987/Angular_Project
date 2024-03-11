import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = environment.apiUrl;
  private subscriptionUrl = `${this.apiUrl}subscription`;
  private customerUrl = `${this.apiUrl}customer`;

  constructor(private http: HttpClient) { }
  getsubscription(search:string,filter:string): Observable<any> {
    const params = new HttpParams()
    .set('search', search)
    .set('filter', filter);
    return this.http.get<any[]>(this.subscriptionUrl, { params });
  }

  registerSubscription(registerSubscription: any): Observable<any> {
    return this.http.post<any>(`${this.subscriptionUrl}/calculate`, registerSubscription);
  }

  getCusto(customerName: string, page: number): Observable<any> {
    const params = new HttpParams()
    .set('first_name', customerName)
    .set('page', page.toString());
    return this.http.get<any>(this.customerUrl, { params });
  }

  getSubscriberRelationship(): Observable<any> {
    return this.http.get<any[]>(`${this.subscriptionUrl}/relationships`);
  }

  getProduct(page?: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get<any>(`${this.apiUrl}product`, { params });
  }
  
  getProductDetails(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}product/${id}`);
  }
}
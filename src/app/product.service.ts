import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessTokenInterface, HttpHeadersInterface } from './http-interfaces';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/product';


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return headers;
  }


  getProduct(filter:string, search:string): Observable<any[]> {

    const params = new HttpParams()
     .set('filter', filter)
    .set('search', search)
    return this.http.get<any[]>(this.apiUrl, {params: params,
      headers: this.getHeaders()
    }).pipe(
      map((data: any) => {
        data['data']['items'].forEach((element: any) => {
          element.text = element.status ? 'active' : 'InActive';
        });
        return data;
      })
    );
  }

  getProductById(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  saveProduct(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData, { headers: this.getHeaders() });
  }

  updateProduct(productId: string, updateData: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(url, updateData, { headers: this.getHeaders() });
  }

  getProductsUrl(): string {
    return this.apiUrl;
  }
  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
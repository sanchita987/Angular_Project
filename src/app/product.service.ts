import { Injectable, } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl+="product";


  constructor(private http: HttpClient) { }

  getProduct(filter: string, search: string): Observable<any[]> {

    const params = new HttpParams()
      .set('filter', filter)
      .set('search', search)
    return this.http.get<any[]>(this.apiUrl, { params: params }).pipe(
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
    return this.http.get<any>(url);
  }

  saveProduct(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  updateProduct(productId: string, updateData: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(url, updateData);
  }

  getProductsUrl(): string {
    return this.apiUrl;
  }
  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map,Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getpayment() {
    return this.http.get<any[]>(environment.apiUrl + 'payment').pipe(
      map((data: any) => {
        data['data']['items'].forEach((element: any) => {
          element.text = element.status ? 'success' : 'failed';
        });
        return data;
      })
    );
  }
getCusto(customerName: string, page: number): Observable<any> {
    const params = new HttpParams()
    .set('first_name', customerName)
    .set('page', page.toString());
    return this.http.get<any>(`${this.apiUrl}customer`, { params });
  }
  getPaymentmode(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}payment_mode`);
  }
  getInvoiceByCustomerId(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}invoice?page=1&per_page=50&customer_id=${customerId}&sort_by=invoice_due_date&filter=unpaid`);
  }
}





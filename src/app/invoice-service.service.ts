import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { AccessTokenInterface, HttpHeadersInterface } from './http-interfaces';


@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeadersInterface {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return headers;
  }

  getInvoice(data: any) {
    let customer_id = 0;
    if (data.customer_id) {
      customer_id = data.customer_id
    }
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/invoice?customer_id=' + customer_id, {
      headers: this.getHeaders()
    })
    .pipe(
      map((data: any) => {
        data['data']['items'].forEach((element: any) => {
          element.text = element.status ? 'Paid' : 'overdue';
        });
        return data;
      })
    );
  }
  getInvoices(id: number) {
    return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/invoice/' + id, {
      headers: this.getHeaders()
    });
  }

  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/invoice';
  register(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data, { headers: this.getHeaders() });
  }
}






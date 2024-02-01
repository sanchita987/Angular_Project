import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {
  constructor(private http: HttpClient) { }
  getInvoice() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/invoice', {
      headers
    });
  }

  getInvoices(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/invoice/' + id, {
      headers
    });
  }

  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/invoice';
  register(data: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
  
    return this.http.post(this.registerUrl, data, { headers });
  }
}





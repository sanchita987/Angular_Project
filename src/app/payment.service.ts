import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , map} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessTokenInterface, HttpHeadersInterface } from './http-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeadersInterface {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return headers;
  }
  getpayment() {
    
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/payment', {
      //params: { page: 1 },
      headers : this.getHeaders() 
    }).pipe(
      map((data: any) => {
        data['data']['items'].forEach((element: any) => {
          element.text = element.status ? 'success' : 'failed';
        });
        return data;
      })
    );
  }
}





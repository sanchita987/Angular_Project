import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessTokenInterface, HttpHeadersInterface } from './http-interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeadersInterface {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return headers;
  }
  apiUrl = "https://nitvcrmapi.truestreamz.com/api/v1/tax";
  gettax() {
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/tax', {
      //params: { page: 1 },
      headers: this.getHeaders()
    });
  }
  registertax(registertax: any): Observable<any> {
    console.warn(registertax)
    return this.http.post<any>(this.apiUrl, registertax, { headers: this.getHeaders() });
  }
}









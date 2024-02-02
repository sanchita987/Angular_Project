import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessTokenInterface, HttpHeadersInterface } from './http-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/customer';
  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/customer/register';

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeadersInterface {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return headers;
  }
  getCustomers(page: number): Observable<any> {

    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }


  updateCustomer(customer_id: number, updatedData: any): Observable<any> {
    const url = `https://nitvcrmapi.truestreamz.com/api/v1/customer/${customer_id}`;
    return this.http.put<any>(url, updatedData, { headers: this.getHeaders() });
  }

  getCustomer(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  getContact(c_id: number, formData: any) {
    const url = "https://nitvcrmapi.truestreamz.com/api/v1/customer/" + c_id + "/contacts";
    return this.http.post<any>(url, formData, { headers: this.getHeaders() });
  }

  updateContact(customer_id: number, contact_id: number, updatedData: any): Observable<any> {
    const url = "https://nitvcrmapi.truestreamz.com/api/v1/customer/" + customer_id + "/contacts/" + contact_id;
    return this.http.put<any>(url, updatedData, { headers: this.getHeaders() });
  }

  deleteContact(customer_id: number, contact_id: number,): Observable<any> {

    const url = "https://nitvcrmapi.truestreamz.com/api/v1/customer/" + customer_id + "/contacts/" + contact_id;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
  register(data: any) {
    let fd = new FormData;
    fd.append('first_name', data.first_name)
    fd.append('last_name', data.last_name)
    fd.append('email', data.email)
    fd.append('customer_type', data.customer_type)
    return this.http.post('https://nitvcrmapi.truestreamz.com/api/v1/customer/register', fd, { headers: this.getHeaders() });
  }

}

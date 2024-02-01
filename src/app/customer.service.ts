import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/customer';
  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/customer/register';

  constructor(private http: HttpClient) { }
  getCustomers(page: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    const url = `${this.apiUrl}?page=${page}`;

    return this.http.get<any>(url, { headers });
  }


  updateCustomer(customer_id: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    const url = `https://nitvcrmapi.truestreamz.com/api/v1/customer/${customer_id}`;
    return this.http.put<any>(url, updatedData, { headers });
  }

  getCustomer(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    const url = `${this.apiUrl}/${id}`;

    return this.http.get<any>(url, { headers });
  }

  getContact(c_id: number, formData: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    const url = "https://nitvcrmapi.truestreamz.com/api/v1/customer/"+c_id+"/contacts";
    return this.http.post<any>(url,formData,{ headers });
  }




  /* register(data: any): Observable<any> {
     let headers = new HttpHeaders();
     let fd = new FormData()
     fd.append('email', data['email'])
     fd.append('first_name', data['first_name'])
     fd.append('last_name', data['last_name'])
     fd.append('customer_type', data['customer_type'])
     fd.append('details', data['details'])
     headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
 
     return this.http.post(this.registerUrl, fd, { headers });
   }*/
  register(data: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    let fd = new FormData;
    fd.append('first_name', data.first_name)
    fd.append('last_name', data.last_name)
    fd.append('email', data.email)
    fd.append('customer_type', data.customer_type)
    return this.http.post('https://nitvcrmapi.truestreamz.com/api/v1/customer/register', fd, { headers });
  }

}

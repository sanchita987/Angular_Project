import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  getcustomers() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/customer?page=50', {
      headers
    });
  }
  getcustomer(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/customer/' + id, {
      headers
    });
  }
  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/customer/register';
  register(data:any): Observable<any> {
    let headers = new HttpHeaders();
    let fd = new FormData()
    fd.append('email', data['email'])
    fd.append('first_name', data['first_name'])
    fd.append('last_name', data['last_name'])
    fd.append('customer_type', data['customer_type'])
    fd.append('details', data['details'])
    headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
    return this.http.post(this.registerUrl, fd, {
      headers
    });
  }
}


  
  


 




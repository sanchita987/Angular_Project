import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessTokenInterface, HttpHeadersInterface } from './http-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeadersInterface {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return headers;
  }
  getuser() {
    
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/user', {
      params: { page: 1 },
      headers : this.getHeaders() 
    });
  }
  getusers(id: number) {
   return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/user/' + id + '/detail', {
    headers : this.getHeaders() 
    });
  }

  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/user';

  register(data: any): Observable<any> {

    return this.http.post(this.registerUrl, data);
  }
  updateUser(id: number, updatedData: any): Observable<any> {
   const url = `https://nitvcrmapi.truestreamz.com/api/v1/user/${id}`;
    return this.http.put<any>(url, updatedData, {headers : this.getHeaders()  });
  }

  
  registerUser(userData: any) {
    return this.http.post('https://nitvcrmapi.truestreamz.com/api/v1/user', userData,{headers : this.getHeaders() });
  }
}













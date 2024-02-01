import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getuser() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/user', {
      params: { page: 1 },
      headers
    });
  }
  getusers(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/user/' + id + '/detail', {
      headers
    });
  }

  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/user';

  register(data: any): Observable<any> {

    return this.http.post(this.registerUrl, data);
  }
  updateUser(id: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    const url = `https://nitvcrmapi.truestreamz.com/api/v1/user/${id}`;
    return this.http.put<any>(url, updatedData, { headers });
  }

  
  registerUser(userData: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.post('https://nitvcrmapi.truestreamz.com/api/v1/user', userData,{headers});
  }
}













import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private registerUrl = `${this.apiUrl}user`;

  constructor(private http: HttpClient) { }

  getuser() {
    
    return this.http.get<any[]>(`${this.apiUrl}user`, {
      params: { page: 1 },
    });
  }
  getusers(id: number) {
   return this.http.get<any>(`${this.apiUrl}user/${id}/detail`);
  }

  register(data: any): Observable<any> {

    return this.http.post(this.registerUrl, data);
  }
  updateUser(id: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}user/${id}`;
    return this.http.put<any>(url, updatedData);
  }
  
  registerUser(userData: any) {
    return this.http.post<any>(this.registerUrl, userData);
  }
}













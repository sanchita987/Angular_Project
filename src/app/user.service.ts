import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getuser() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any[]>('https://nitvcrmapi.truestreamz.com/api/v1/user', {
      headers
    });
    }
    getusers(id: number) {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'bearer ' + localStorage.getItem('access_token'));
      return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/user/'+id+'/detail', {
        headers
      });
  }
}














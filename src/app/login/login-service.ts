import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/user/login';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    let formData = new FormData();
    formData.append('username', data.email)
    formData.append('password', data.password)
    return this.http.post(this.loginUrl, formData);
  }
}

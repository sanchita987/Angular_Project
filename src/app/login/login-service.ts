import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = {
      username: username,
      password: password,
    };

    return this.http.post<any>(this.loginUrl, credentials);
  }
}

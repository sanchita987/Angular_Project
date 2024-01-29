import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  constructor( private http: HttpClient) { }
  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/user';
  


  register(data:any): Observable<any> {

    // let formData = new FormData();
    // formData.append('name', name)
    // formData.append('email', email)
    // formData.append('company', company)
    // formData.append('address', address)
    // formData.append('user_type', user_type)
    // formData.append('password', password)
    // formData.append('phone', phone)
    // formData.append('is_active', is_active)
    return this.http.post(this.registerUrl, data);
  }
}

  
  


 
